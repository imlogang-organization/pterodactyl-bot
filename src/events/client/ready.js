module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready!!!! ${client.user.tag} is logged in and online!`);
  },
};
