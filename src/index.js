// create and setup enviroment variables to securely store credentials
require('dotenv').config();
const { Client, Routes, Collection, GatewayIntentBits } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');

const { BOT_TOKEN, APP_ID } = process.env;
// initlize our discord bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  rest: { version: '10' },
});

// Set the authorization token that should be used for requests
client.rest.setToken(BOT_TOKEN);

async function main() {
  try {
    client.slashCommands = new Collection();
    // register all commands from "commands" folder to memory
    await registerCommands(client, '../commands');
    // display all registered commands to console
    console.log(client.slashCommands.map((c) => c.name));
    const slashCommandsJson = client.slashCommands.map((cmd) =>
      cmd.getSlashCommandJSON()
    );
    // register slash commands to discord so they become accssible to users.
    await client.rest.put(Routes.applicationCommands(APP_ID), {
      body: slashCommandsJson,
    });
    // register basic websocket events such as "ready", "error" and handle them accordingly.
    registerEvents(__dirname, client);

    // login to discord with token
    await client.login(BOT_TOKEN);
  } catch (err) {
    // handle any unexpected errors
    console.log(err);
  }
}

main();
