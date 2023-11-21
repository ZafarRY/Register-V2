const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const token = process.env['TOKEN'];

module.exports = (bot) => {
  bot.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = bot;
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = process.env['CLIENT_ID']
    const guildId = process.env['GUILD_ID']
    const rest = new REST({ version: "9" }).setToken(token);

    try {
      console.log("Perintah aplikasi penyegaran awal (/).");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: bot.commandArray,
      });

      console.log("Perintah aplikasi (/) berhasil dimuat ulang.");
    } catch (error) {
      console.error(error);
    }
  };
};
