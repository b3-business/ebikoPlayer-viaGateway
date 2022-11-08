import { REST, Routes } from 'discord.js';
import fs from 'node:fs';

const commandsPath = './src/commands';
const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`${commandsPath}/${file}`);
  commands.push(command.data.toJSON());
}

const { DISCORD_TOKEN, CLIENT_ID, BRUDI_GUILD_ID, BGF_GUILD_ID } = process.env;

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    // refresh all commands on brudi server
    const brudiResult = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, BRUDI_GUILD_ID),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${brudiResult.length} application (/) commands on Server "Brudi Chat".`
    );

    // refresh all commands on bgf server
    const bgfResult = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, BGF_GUILD_ID),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${bgfResult.length} application (/) commands on Server "BGF Runde".`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
