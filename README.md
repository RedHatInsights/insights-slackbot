# Insights Slackbot

Simple [Slack Bot](https://api.slack.com/bot-users) that posts updates about systems monitored by [Red Hat Insights](https://access.redhat.com/insights/info)
to a Slack channel.

## Running

Follow [this tutorial](./tutorial/Tutorial.md) to deploy and set up insights-slackbot.

## Configuration options

The following environment variables can be used to tune Insights Slackbot:
* `SLACK_TOKEN` - token for authentication
* `SLACK_CHANNEL` - Slack channel the bot will post messages to (insights-webhooks by default)
* `SERVER_SECRET`- secret part of the URL that prevents unauthorized actors from posting
* `SERVER_PORT` - server port (3006 by default)
