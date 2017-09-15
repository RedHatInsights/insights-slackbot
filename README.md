# Insights Slackbot

Simple [Slack Bot](https://api.slack.com/bot-users) that posts updates about systems monitored by [Red Hat Insights](https://access.redhat.com/insights/info)
to a Slack channel.

## Running
1. Get a Slack token for the Bot
1. Run Insights Slackbot
    ```
    SLACK_TOKEN='<put token here>' npm start
    ```
    The server needs to be accessible from the Internet. Alternatively, use [ultrahook](http://www.ultrahook.com/) to route webhooks to your local machine.
1. Configure a [webhook in Insights](https://access.redhat.com/insightsbeta/config/webhooks)

## Configuration

The following environment variables can be used to tune Insights Slackbot:
* `SLACK_TOKEN` - token for authentication
* `SLACK_CHANNEL` - Slack channel the bot will post messages to (insights-webhooks by default)
* `SERVER_SECRET`- secret part of the URL that prevents unauthorized actors from posting
* `SERVER_PORT` - server port (3006 by default)
