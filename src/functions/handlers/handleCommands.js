require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client } = require("discord.js");
const { DISCORD_BOT_TOKEN, DISCORD_BOT_CLIENT_ID } = process.env;

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          `Command: ${command.data.name} has been passed through the handler`
        );
      }
    }

    const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);
    // process.env.<name> needs to be token from `.env`.
    try {
      // console.log(`Started refreshing application (/) commands.`);
      await rest.put(Routes.applicationCommands(DISCORD_BOT_CLIENT_ID), {
        body: client.commandArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
