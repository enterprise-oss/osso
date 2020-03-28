# frozen_string_literal: true

require 'spec_helper'

describe SlackTeam do
  describe '#slack_users_count' do
    it 'increments the counter cache when a Slack User is added to team' do
      team = create(:slack_team)

      SlackUser.create(slack_team: team)

      expect(team.reload.slack_users_count).to eq(1)
    end
  end
end

# == Schema Information
#
# Table name: slack_teams
#
#  id                :uuid             not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  slack_team_id     :string
#  name              :string
#  slack_users_count :integer          default(0)
#
