const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      const cmd = interaction.client.slashCommands.get(commandName);
      if (cmd) {
        try {
          cmd.run(interaction.client, interaction);
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
};
