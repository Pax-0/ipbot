const BaseSlashCommand = require('../../utils/BaseSlashCommand');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

require('dotenv').config();

module.exports = class PingCommand extends BaseSlashCommand {
  constructor() {
    super('ping');
  }

  async run(client, interaction) {
    let time = Date.now();
    await interaction.deferReply();
    try {
      return interaction.editReply({
        content: `Pong! ${Date.now() - time}ms`,
      });
    } catch (error) {
      console.log(error);
      return interaction.editReply({
        content:
          'There was an error while handling your request, please let an admin know. ',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("test the bot's responsiveness")
      .toJSON();
  }
};
