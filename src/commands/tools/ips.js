require('dotenv').config();
const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");
const { PteroToken } = process.env;
const { PTERO_URL } = process.env

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ips")
    .setDescription("List the current IPs of the current Servers."),
  async execute(interaction) {
    fetch(`${PTERO_URL}/api/client`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${PteroToken}`,
      },
    }).then((res) =>
      res.json().then((res) => {
        interaction.reply(res.data);
      })
    );
  },
};