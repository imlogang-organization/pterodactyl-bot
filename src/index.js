require('dotenv').config();
const { DISCORD_BOT_TOKEN } = process.env
const fs = require('node:fs')
const {
  Client,
  Collection,
  GatewayIntentBits,
} = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })

client.commands = new Collection()
client.commandArray = []

const functionFolders = fs.readdirSync('./src/functions')
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'))
  for (const file of functionFiles) { require(`./functions/${folder}/${file}`)(client) }
}

client.handleEvents()
client.handleCommands()
client.login(DISCORD_BOT_TOKEN)