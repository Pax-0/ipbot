# Features

Welcome, this is an open source cybersecurity awareness bot.

You can get a sample of information related to an ip using `/get-ip-info` on discord

# Requirements

Node.js 16.9.0 or newer is required.
[how to install Nodejs](https://www.pluralsight.com/guides/getting-started-with-nodejs)

# Installation

to install all dependencies just run the following command

> npm install

# Setup configuration

1. rename example.env to .env
2. fill in the needed information such as your bot's token, bot's id, and your [GEO API](https://portal.thatapicompany.com/pages/location-api) Key.

# Guide on making a discord bot account

relevant info available from "How to Create a Discord Bot Account"
[click here](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/)

Adding the bot to your server starts from "How to Invite Your Bot to Join a Server", and ends at "To add the bot, your account needs "Manage Server" permissions."

- make sure you grant the bot the scope "applications.commands" as it required for "/" commands

# Start the bot:

Running bot in terminal (to test configuration)

> npm start

P.S. This will run the bot in the terminal window, if it closes so does the bot, also it will not autorestart, see below for a recommended process manager.

# Start the bot with a process manager (PM2)

## Install PM2

To install pm2 globally via npm

## Quick install

run:

### First time use only:

> `npm install pm2@latest -g`

> npm run pm2

This starts the bot, and will remain running even after you close the window (as long as the server/computer itself is running)

### Afterwards you can use below commands to control the bot.

> pm2 start ipBot

> pm2 stop ipBot

> pm2 restart ipBot

> pm2 logs ipBot

[More details about pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)
