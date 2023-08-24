# Features

Welcome, this is an open source cybersecurity awareness bot.

You can get a sample of information related to an ip using `/get-ip-info` on discord

You can add a live version [here](https://discord.com/api/oauth2/authorize?client_id=1143639792081449020&permissions=0&scope=bot%20applications.commands)

# Requirements

Node.js 16.9.0 or newer is required.
[how to install Nodejs](https://discordjs.guide/preparations/#installing-node-js)

# Installation

to install all dependencies just run the following command

> npm install

# Setup configuration

1. rename example.env to .env
2. fill in the needed information such as your bot's token, bot's id, and your [GEO API](https://portal.thatapicompany.com/pages/location-api) Key.

if you need help with getting your bot's token and id, see [here](https://github.com/Pax-0/ipbot#guide-on-making-a-discord-bot-account)

# Guide on making a discord bot account

1. first you have to create a bot account
   [How to Create a Discord Bot Account?](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. secondly, you need to add your new bot to a discord server so you can access its commands.

   [how to add bot to server?](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#adding-your-bot-to-servers)

- make sure you grant the bot the scope "applications.commands" as it required for "/" commands

# Start the bot:

Running bot in terminal (to test configuration)

> npm start

P.S. This will run the bot in the terminal window, if it closes so does the bot, also it will not autorestart, see [below](https://github.com/Pax-0/ipbot#start-the-bot-with-a-process-manager-pm2) for a recommended process manager.

# Start the bot with a process manager (PM2)

### You need to have pm2 installed

To install pm2 globally via npm

### Quick install

run:

### First time use only:

> `npm install pm2@latest -g`

> npm run pm2

This starts the bot, and will remain running even after you close the window (as long as the server/computer itself is running)

### Afterwards you can use these commands to control your bot.

> pm2 start ipBot

> pm2 stop ipBot

> pm2 restart ipBot

> pm2 logs ipBot

[More details about pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)
