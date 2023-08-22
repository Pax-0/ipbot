const path = require('path');
const fs = require('fs/promises');

async function registerCommands(client, dir = '') {
  // loop over all files/folders in "commands"
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    // if this item is a folder loop through it aswell.
    if (stat.isDirectory())
      await registerCommands(client, path.join(dir, file));

    // filter for javascript files only.
    if (file.endsWith('.js')) {
      // import the command from its file
      const Command = require(path.join(filePath, file));
      const cmd = new Command();
      // save the command to memory
      client.slashCommands.set(cmd.name, cmd);
      console.log(`Registering ${cmd.name}`);
    }
  }
}

async function registerEvents(dir, client) {
  // loop over all files/folders in "commands"

  const eventsPath = path.join(dir, 'events');
  const eventFiles = await fs.readdir(eventsPath);
  // filter for javascript files only.

  eventFiles.filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    // import the event handler from its file

    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    // handle wether this event should fire only once, to avoid unwanted looops
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

module.exports = {
  // exports our functions
  registerCommands,
  registerEvents,
};
