# frozen_string_literal: true

FactoryBot.define do
  factory :enterprise_account, class: Models::EnterpriseAccount do
    id { SecureRandom.uuid }
    domain { Faker::Internet.domain_name }
  end

  factory :enterprise_with_okta, parent: :enterprise_account do
    after :create do |enterprise|
      create(
        :okta_saml_provider,
        domain: enterprise.domain,
        enterprise_account_id: enterprise.id,
      )
    end
  end

  factory :enterprise_with_azure, parent: :enterprise_account do
    after :create do |enterprise|
      create(
        :azure_saml_provider,
        domain: enterprise.domain,
        enterprise_account_id: enterprise.id,
      )
    end
  end

  factory :enterprise_with_multiple_providers, parent: :enterprise_account do
    after :create do |enterprise|
      create(
        :okta_saml_provider,
        domain: enterprise.domain,
        enterprise_account_id: enterprise.id,
      )

      create(
        :azure_saml_provider,
        domain: enterprise.domain,
        enterprise_account_id: enterprise.id,
      )
    end
  end
end
