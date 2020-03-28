# frozen_string_literal: true

module Services
  class SlackOauthCallback
    attr_accessor :user_values, :team_values, :options

    def self.perform(user_values, team_values, options = {})
      new(user_values, team_values, options).perform
    end

    def initialize(user_values, team_values, options = {})
      @user_values = user_values
      @team_values = team_values
      @options = options
    end

    def perform
      slack_team = update_or_create_slack_team
      slack_user = update_or_create_slack_user(slack_team)

      SyncSlackUsersJob.perform_async(slack_user.id) if options[:token]
    end

    private

    def update_or_create_slack_user(slack_team)
      update_params = {
        name: user_values['real_name'],
        online: user_values['presence'] != 'away',
        status_message: user_values.dig('profile', 'status_text').presence,
        status_icon: user_values.dig('profile', 'status_emoji').presence,
        slack_token: options[:token],
        slack_team: slack_team,
      }

      update_params[:user] = options[:user] if options[:user]

      SlackUser.update_or_create(
        slack_user_id: user_values['id'],
        **update_params,
      )
    end

    def update_or_create_slack_team
      SlackTeam.update_or_create(
        slack_team_id: team_values['id'],
        **{ name: team_values['name'] }.compact,
      )
    end
  end
end
