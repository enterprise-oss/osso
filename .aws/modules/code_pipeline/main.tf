data "aws_secretsmanager_secret_version" "github" {
  secret_id = "github"
}

data "aws_secretsmanager_secret_version" "dockerhub-creds" {
  secret_id = "dockerhub-creds"
}

locals {
  github = jsondecode(
    data.aws_secretsmanager_secret_version.github.secret_string
  )

  dockerhub_creds = jsondecode(
    data.aws_secretsmanager_secret_version.dockerhub-creds.secret_string
  )
}

resource "aws_s3_bucket" "source" {
  bucket        = "osso-source"
  acl           = "private"
  force_destroy = true
}

resource "aws_iam_role" "codepipeline_role" {
  name               = "codepipeline-role"

  assume_role_policy = "${file("${path.module}/policies/codepipeline_role.json")}"
}

/* policies */
data "template_file" "codepipeline_policy" {
  template = "${file("${path.module}/policies/codepipeline.json")}"

  vars = {
    aws_s3_bucket_arn = "${aws_s3_bucket.source.arn}"
  }
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name   = "codepipeline_policy"
  role   = "${aws_iam_role.codepipeline_role.id}"
  policy = "${data.template_file.codepipeline_policy.rendered}"
}

/*
/* CodeBuild
*/
resource "aws_iam_role" "codebuild_role" {
  name               = "codebuild-role"
  assume_role_policy = "${file("${path.module}/policies/codebuild_role.json")}"
}

data "template_file" "codebuild_policy" {
  template = "${file("${path.module}/policies/codebuild_policy.json")}"

  vars = {
    aws_s3_bucket_arn = "${aws_s3_bucket.source.arn}"
    region = "${var.region}"
  }
}

resource "aws_iam_role_policy" "codebuild_policy" {
  name        = "codebuild-policy"
  role        = "${aws_iam_role.codebuild_role.id}"
  policy      = "${data.template_file.codebuild_policy.rendered}"
}

data "template_file" "buildspec" {
  template = "${file("${path.module}/buildspec.yml")}"

  vars = {
    repository_url     = "${var.repository_url}"
    region             = "${var.region}"
    cluster_name       = "${var.ecs_cluster_name}"
    subnet_id          = "${var.run_task_subnet_id}"
    security_group_ids = "${join(",", var.run_task_security_group_ids)}"
  }
}


resource "aws_codebuild_project" "osso_build" {
  name          = "osso-codebuild"
  build_timeout = "10"
  service_role  = "${aws_iam_role.codebuild_role.arn}"

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/amazonlinux2-x86_64-standard:3.0" // https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html
    type            = "LINUX_CONTAINER"
    privileged_mode = true
    image_pull_credentials_type   = "CODEBUILD"

    environment_variable {
      name  = "DOCKER_USERNAME"
      value = local.dockerhub_creds.username
    }

    environment_variable {
      name  = "DOCKER_PASSWORD"
      value = local.dockerhub_creds.password
    }

    # registry_credential {
    #   credential = local.dockerhub_creds
    #   credential_provider = "SECRETS_MANAGER"
    # }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "${data.template_file.buildspec.rendered}"
  }
}

/* CodePipeline */

resource "aws_codepipeline" "pipeline" {
  name     = "osso-pipeline"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store {
    location = "${aws_s3_bucket.source.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source"]

      configuration = {
        Owner      = "enterprise-oss"
        Repo       = "osso"
        Branch     = "docker"
        OAuthToken = local.github.oauth_token
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source"]
      output_artifacts = ["imagedefinitions"]

      configuration = {
        ProjectName = "osso-codebuild"
      }
    }
  }

  stage {
    name = "Production"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      input_artifacts = ["imagedefinitions"]
      version         = "1"

      configuration = {
        ClusterName = "${var.ecs_cluster_name}"
        ServiceName = "${var.ecs_service_name}"
        FileName    = "imagedefinitions.json"
      }
    }
  }
}