# frozen_string_literal: true

require 'spec_helper'

describe Routes::Slack do
  describe 'get /auth/slack/callback' do
    let(:auth_hash) do
      json_fixture('auth_hash.json')
    end

    before do
      OmniAuth.config.add_mock(:slack, auth_hash)
    end

    context 'with a new user' do
      it 'creates a User' do
        expect { get '/auth/slack/callback' }.
          to change { User.count }.
          by(1)
      end

      it 'creates a SlackUser' do
        expect { get '/auth/slack/callback' }.
          to change { SlackUser.count }.
          by(1)
      end

      it 'associates the SlackUser with a SlackTeam' do
        get '/auth/slack/callback'

        user = User.last

        expect(user.slack_teams.map(&:name)).to include(
          auth_hash['info']['team'],
        )
      end
    end

    context 'with an existing SlackUser' do
      let(:current_user) do
        create(:user, email: auth_hash.dig('info', 'email'))
      end

      let!(:slack_user) do
        create(:slack_user, slack_user_id: auth_hash['uid'], user: current_user)
      end

      it 'does not create a SlackUser' do
        expect { get '/auth/slack/callback' }.
          to_not change { SlackUser.count }
      end

      it 'does not create a User' do
        expect { get '/auth/slack/callback' }.
          to_not change { User.count }
      end
    end

    context 'with a new team' do
      it 'creates a SlackTeam' do
        expect { get '/auth/slack/callback' }.
          to change { SlackTeam.count }.
          by(1)
      end

      it 'associates the SlackUser with the SlackTeam' do
        get '/auth/slack/callback'

        team = SlackTeam.last

        expect(team.slack_users.map(&:slack_user_id)).to match(
          [auth_hash['uid']],
        )
      end
    end

    context 'with an existing team' do
      before do
        create(:slack_team, slack_team_id: auth_hash.dig('info', 'team_id'))
      end

      it 'does not create a SlackTeam' do
        expect { get '/auth/slack/callback' }.
          to_not change { SlackTeam.count }
      end

      it 'associates the SlackUser with the SlackTeam' do
        get '/auth/slack/callback'

        team = SlackTeam.last

        expect(team.slack_users.map(&:slack_user_id)).to match(
          [auth_hash['uid']],
        )
      end
    end

    it 'enques a SyncSlackUsersJob for the SlackTeam' do
      allow(SyncSlackUsersJob).to receive(:perform_async)

      get '/auth/slack/callback'

      expect(SyncSlackUsersJob).to have_received(:perform_async).with(
        SlackUser.last.id,
      )
    end
  end

  describe 'post /slack/webhook' do
    context 'with a team_join event' do
      let(:event_params) { json_fixture('team_join.json') }

      context 'with a new user' do
        it 'creates a SlackUser' do
          expect { post '/slack/webhook', event_params }.
            to change { SlackUser.count }.
            by(1)
        end
      end

      context 'with an existing user joining a new team' do
        it 'does not create a SlackUser' do
          create(
            :slack_user,
            slack_user_id: event_params.dig('event', 'user', 'id'),
          )

          expect { post '/slack/webhook', event_params }.
            to_not change { SlackUser.count }
        end
      end

      it 'associates the SlackUser with the existing SlackTeam' do
        team = create(
          :slack_team,
          slack_team_id: event_params['team_id'],
          name: 'has a name',
        )

        post '/slack/webhook', event_params

        expect(team.slack_users.count).to eq(1)
      end

      it 'does not overwrite the name of the SlackTeam' do
        team = create(
          :slack_team,
          slack_team_id: event_params['team_id'],
          name: 'has a name',
        )

        post '/slack/webhook', event_params

        expect(team.reload.name).to eq('has a name')
      end
    end

    context 'with a user_change event' do
      let(:event_params) { json_fixture('user_change.json') }

      it 'updates the SlackUser data' do
        user = create(:user)

        slack_user = create(
          :slack_user,
          slack_user_id: event_params.dig('event', 'user', 'id'),
          name: 'a different name',
          online: true,
          status_icon: ':books:',
          status_message: 'reading docs...',
          user: user,
        )

        post '/slack/webhook', event_params

        expect(slack_user.reload).to have_attributes(
          name: 'sam new',
          online: false,
          status_icon: ':beers:',
          status_message: nil,
          user: user,
        )
      end
    end

    context 'with a member_joined_channel event' do
      let(:event_params) { json_fixture('member_joined_channel.json') }
      let!(:slack_user) do
        create(
          :slack_user,
          slack_user_id: event_params.dig('event', 'user'),
        )
      end

      context 'with an existing channel' do
        it 'does not create a channel ' do
          create(
            :slack_channel,
            slack_team_id: event_params.dig('event', 'team'),
            slack_channel_id: event_params.dig('event', 'channel'),
          )

          expect { post '/slack/webhook', event_params }.
            to_not change { SlackChannel.count }
        end

        it 'associates the Slack User with the channel' do
          post '/slack/webhook', event_params

          expect(slack_user.slack_channels.count).to eq(1)
        end
      end

      context 'with a previously unseen channel' do
        it 'creates a channel ' do
          expect { post '/slack/webhook', event_params }.
            to change { SlackChannel.count }.by(1)
        end

        it 'associates the slack User with the channel' do
        end
      end
    end
  end

  context 'with a member_left_channel event' do
    let(:event_params) { json_fixture('member_left_channel.json') }
    let!(:slack_user) do
      create(
        :slack_user,
        slack_user_id: event_params.dig('event', 'user'),
      )
    end
    let!(:slack_channel) do
      create(
        :slack_channel,
        slack_team_id: event_params.dig('event', 'team'),
        slack_channel_id: event_params.dig('event', 'channel'),
      )
    end

    it 'does not create a channel ' do
      expect { post '/slack/webhook', event_params }.
        to_not change { SlackChannel.count }
    end

    it 'dissociates the Slack User from the channel' do
      post '/slack/webhook', event_params

      expect(slack_user.slack_channels).to_not include(slack_channel)
    end
  end
end
