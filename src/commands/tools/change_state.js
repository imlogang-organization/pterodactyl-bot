const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { PteroToken } = process.env
const { PTERO_URL } = process.env
const fs = require('fs');
const serverData = JSON.parse(fs.readFileSync('servers.json', 'utf8'));
const serverChoices = serverData.map(server => ({ name: server.name, value: server.value }));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('change_state')
    .setDescription('Restart/Shutdown/Turn On Server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('server')
        .setDescription('Which Server?')
        .setRequired(true)
        .addChoices(serverChoices)
    )
    .addStringOption((option) =>
      option
        .setName('state')
        .setDescription(
          'What power state should the server be in?'
        )
        .setRequired(true)
        .addChoices(
          { name: "Shutdown", value: "stop"},
          { name: "Start", value: "start"},
          { name: "Restart", value: "restart" }
        )
    ),
  async execute (interaction) {
    const serverValue = interaction.options.getString('server')
    const state = interaction.options.getString('state')
    let changed_state; 
    switch (state) {
      case "stop":
        changed_state = "stopped"
        break
      case "start":
        changed_state = "started"
        break
      case "restart":
        changed_state = "restarted"
        break
      default: 
        changed_state = "Please select a Value"
        break
    }
    const serverName = this.data.options[0].choices.find(choice => choice.value === serverValue).name;
    fetch(
      `${PTERO_URL}/api/client/servers/${serverValue}/power`,
      {
        method: 'POST',
        headers: {
          Accept: 'applicatnion/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PteroToken}`
        },
        body: JSON.stringify(
          {
            signal: `${state}`
          },
          null,
          2
        )
      }
    ).then((res) => {
      let Response
      switch (res.status) {
        case 204:
          Response = `${serverName} has been ${changed_state}.`
          break
        default:
          Response = `There was an error changing the state on ${serverName}`
          console.error(res)
          break
      }
      interaction.reply(`${Response}`)
    })
  }
}