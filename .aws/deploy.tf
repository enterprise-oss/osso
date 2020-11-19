/*====
Variables used across all modules
======*/

provider "aws" {
  region = var.region
  version = "~> 2.0"
}

data "aws_secretsmanager_secret_version" "creds" {
  secret_id = "db-creds"
}

locals {
  availability_zones = var.availability_zones
  db_creds = jsondecode(
    data.aws_secretsmanager_secret_version.creds.secret_string
  )
}

module "networking" {
  source               = "./modules/networking"
  environment          = var.environment
  vpc_cidr             = "10.0.0.0/16"
  public_subnets_cidr  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets_cidr = ["10.0.10.0/24", "10.0.20.0/24"]
  region               = var.region
  availability_zones   = local.availability_zones
  key_name             = "production_key"
}

module "rds" {
  source            = "./modules/rds"
  environment       = var.environment
  allocated_storage = "20"
  database_name     = var.database_name
  database_username = local.db_creds.username
  database_password = local.db_creds.password
  subnet_ids        = module.networking.private_subnets_id
  vpc_id            = module.networking.vpc_id
  instance_class    = "db.t2.micro"
}

module "ecs" {
  source             = "./modules/ecs"
  environment        = var.environment
  vpc_id             = module.networking.vpc_id
  availability_zones = local.availability_zones
  repository_name    = "enterprise-oss/osso"
  subnets_ids        = module.networking.private_subnets_id
  public_subnet_ids  = module.networking.public_subnets_id
  security_groups_ids = concat([module.rds.db_access_sg_id], module.networking.security_groups_ids)
  database_endpoint = module.rds.rds_address
  database_name     = var.database_name
  database_username = local.db_creds.username
  database_password = local.db_creds.password
  secret_key_base   = var.secret_key_base
}

