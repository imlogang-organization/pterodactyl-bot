const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { PteroToken } = process.env
const { PTERO_URL } = process.env
const fs = require('fs');
const serverData = JSON.parse(fs.readFileSync('servers.json', 'utf8'));
const serverChoices = serverData.map(server => ({ name: server.name, value: server.value }));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Whitelist a User.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('server')
        .setDescription('Which Minecraft Server?')
        .setRequired(true)
        .addChoices(serverChoices)
    )

    .addStringOption((option) =>
      option
        .setName('user')
        .setDescription(
          'What is the username of the person who is being whitelisted?'
        )
        .setRequired(true)
    ),
  async execute (interaction) {
    const serverValue = interaction.options.getString('server')
    const user = interaction.options.getString('user')
    console.log(user)
    const sqlKeywords = ['drop', 'select', 'delete', 'insert', 'update', 'create', 'alter', 'truncate', ';', ' '];
    if (sqlKeywords.some(keyword => user.toLowerCase().includes(keyword))) {
      return interaction.reply('Invalid username. Usernames cannot contain dumb words.');
    }
    const serverName = this.data.options[0].choices.find(choice => choice.value === serverValue).name;
    fetch(
      `${PTERO_URL}/api/client/servers/${serverValue}/command`,
      {
        method: 'POST',
        headers: {
          Accept: 'applicatnion/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PteroToken}`
        },
        body: JSON.stringify(
          {
            command: `whitelist add ${user}`
          },
          null,
          2
        )
      }
    ).then((res) => {
      let Response;
      switch (res.status) {
        case 204:
          Response = `${user} has been whitelisted on ${serverName}!`
          break
        default:
          Response = 'There was an error whitelisting this user. Please check the logs.'
          console.error(res)
          break
      }
      interaction.reply(`${Response}`)
    })
  }
}