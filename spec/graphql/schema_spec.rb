# frozen_string_literal: true

require 'spec_helper'

describe WorkosSlackSchema do
  let!(:current_user) do
    create(:user)
  end

  describe 'SlackTeams' do
    it 'returns Slack Teams for the current user' do
      create(:slack_team)

      dauchsend = create(:slack_team, name: 'dauchsend')
      create(:slack_user, slack_team: dauchsend, user: current_user)

      vcardme = create(:slack_team, name: 'vcardme')
      create(:slack_user, slack_team: vcardme, user: current_user)

      query = <<~GRAPHQL
        query SlackTeams {
          slackTeams {
            name
            id
          }
        }
      GRAPHQL

      response = described_class.execute(
        query,
        variables: nil,
        context: { current_user: current_user },
      )

      expect(response['errors']).to be_nil

      expect(response.dig('data', 'slackTeams').count).to eq(2)
      expect(response.dig('data', 'slackTeams').
        map { |team| team['name'] }).
        to match_array(%w[dauchsend vcardme])
    end
  end

  describe 'SlackTeams' do
    it 'returns Slack Users for the requested team' do
      slack_team = create(:slack_team)
      create(:slack_user, slack_team: slack_team, user: current_user)
      create_list(:slack_user, 5, slack_team: slack_team)
      create_list(:slack_user, 2)

      query = <<~GRAPHQL
        query SlackTeams($id: ID!, $first: Int!, $cursor: String,) {
          node(id: $id) {
            ... on SlackTeam {
              id
              name
              slackUsers(first: $first, after: $cursor) {
                edges{
                  node {
                    id
                    name
                    slackChannels {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          }
        }
      GRAPHQL

      response = described_class.execute(
        query,
        variables: {
          id: described_class.id_from_object(slack_team),
          first: 5,
        },
        context: { current_user: current_user },
      )

      expect(response['errors']).to be_nil
      slack_users = response.dig('data', 'node', 'slackUsers', 'edges')
      expect(slack_users.count).to eq(5)
    end
  end
end
