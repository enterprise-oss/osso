class AddAssertionConsumerServiceUrlToIpis < ActiveRecord::Migration[6.0]
  def change
    add_column :identity_provider_instances, :assertion_consumer_service_url, :string
  end
end
