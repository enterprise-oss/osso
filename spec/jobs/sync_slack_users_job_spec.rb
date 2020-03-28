# frozen_string_literal: true

require 'spec_helper'

describe SyncSlackUsersJob do
  let(:slack_client) { double('Slack::Web::Client') }
  let(:response) { json_fixture('users_list.json') }
  before do
    Sidekiq::Testing.inline!
    allow(slack_client).to receive(:users_list).and_return(
      response,
      response.merge(
        'response_metadata' => {
          'next_cursor' => nil,
        },
      ),
    )
    allow(Slack::Web::Client).to receive(:new).and_return(slack_client)
  end

  after do
    Sidekiq::Testing.fake!
  end

  describe 'perform_async' do
    let(:user) { create(:user) }
    let(:slack_team) do
      create(
        :slack_team,
        slack_team_id: response.dig('members', 0, 'team_id'),
      )
    end
    let!(:slack_user) do
      create(:slack_user, user: user, slack_team: slack_team)
    end

    it 'initializes a Slack client with token' do
      described_class.perform_async(slack_user.id)

      expect(Slack::Web::Client).to have_received(:new).with(
        token: slack_user.slack_token,
      )
    end

    it 'calls the Slack API to list users' do
      # NOTE(sb): the client is mocked above to return
      # two pages of data via Slack API's cursor based pagination
      described_class.perform_async(slack_user.id)

      expect(slack_client).to have_received(:users_list).exactly(:twice)
    end

    it 'creates SlackUsers' do
      # NOTE(sb): ignores deleted users
      # and USLACKBOT from fixture json
      expect do
        described_class.perform_async(slack_user.id)
      end.to change {
        SlackUser.count
      }.by(3)
    end

    it 'associates users with the Slack Team' do
      # NOTE(sb): 1 associated SlackUser created in the let,
      # plus 3 block in the fixture - ignoring deleted users
      # and USLACKBOT
      described_class.perform_async(slack_user.id)

      expect(slack_team.reload.slack_users_count).to eq(4)
    end
  end
end
