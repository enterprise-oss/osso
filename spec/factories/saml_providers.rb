# frozen_string_literal: true

FactoryBot.define do
  factory :saml_provider, class: Models::SamlProvider do
    id { SecureRandom.uuid }
    domain { Faker::Internet.domain_name }
    enterprise_account
    oauth_client
    idp_cert do
      <<~CERT
        -----BEGIN CERTIFICATE-----
        MIIDpDCCAoygAwIBAgIGAXEiD4LlMA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG
        A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
        MBIGA1UECwwLU1NPUHJvdmlkZXIxEzARBgNVBAMMCmRldi0xNjIwMjQxHDAaBgkqhkiG9w0BCQEW
        DWluZm9Ab2t0YS5jb20wHhcNMjAwMzI4MTY1MTU0WhcNMzAwMzI4MTY1MjU0WjCBkjELMAkGA1UE
        BhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNV
        BAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRMwEQYDVQQDDApkZXYtMTYyMDI0MRwwGgYJ
        KoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
        wsnP4UTfv3bxR5Jh0at51Dqjj+fKxFznzFW3XA5NbF2SlRLjeYcvj3+47TC0eP6xOsLWfnvdnx4v
        dd9Ufn7jDCo5pL3JykMVEh2I0szF3RLC+a532ArcwgU9Px48+rWVwPkASS7l4NHAM4+gOBHJMQt2
        AMohPT0kU41P8BEPzfwhNyiEXR66JNZIJUE8fM3Vpgnxm/VSwYzJf0NfOyfxv8JczF0zkDbpE7Tk
        3Ww/PFFLoMxWzanWGJQ+blnhv6UV6H4fcfAbcwAplOdIVHjS2ghYBvYNGahuFxjia0+6csyZGrt8
        H4XmR5Dr+jXY5K1b1VOA0k19/FCnHHN/smn25wIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBgD9NE
        4OCuR1+vucV8S1T6XXIL2hB7bXBAZEVHZ1aErRzktgXAMgVwG267vIkD5VOXBiTy9yNU5LK6G3k2
        zewU190sL1dMfyPnoVZyn94nvwe9A+on0tmZdmk00xirKk3FJdacnZNE9Dl/afIrcNf6xAm0WsU9
        kbMiRwwvjO4TAiygDQzbrRC8ZfmT3hpBa3aTUzAccrvEQcgarLk4r7UjXP7a2mCN3UIIh+snN2Ms
        vXHL0r6fM3xbniz+5lleWtPFw73yySBc8znkWZ4Tn8Lh0r6o5nCRYbr2REUB7ZIfiIyBbZxIp4kv
        a+habbnQDFiNVzEd8OPXHh4EqLxOPDRW
        -----END CERTIFICATE-----
      CERT
    end

    factory :okta_saml_provider, parent: :saml_provider, class: Models::OktaSamlProvider do
      provider { 'Models::OktaSamlProvider' }
      idp_sso_target_url do
        'https://dev-162024.okta.com/app/vcardmedev162024_rubydemo2_1/exk51326b3U1941Hf4x6/sso/saml'
      end
    end

    factory :azure_saml_provider, parent: :saml_provider, class: Models::AzureSamlProvider do
      provider { 'Models::AzureSamlProvider' }
      idp_sso_target_url do
        'https://login.microsoftonline.com/0af6c610-c40c-4683-9ea4-f25e509b8172/saml2'
      end
    end
  end
end
