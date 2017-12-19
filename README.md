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
* `INSIGHTS_URL` - the base URL of Red Hat Insights. Defaults to https://access.redhat.com/insightsbeta
* `ATHERE` - comma-separated list of events for which `@here` should be used. None by default
