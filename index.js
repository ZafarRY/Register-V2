const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
var http = require("http");

const token = process.env['TOKEN'];

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.commands = new Collection();
bot.buttons = new Collection();
bot.modals = new Collection();
bot.commandArray = [];

const functions = fs
  .readdirSync(`./functions`)
  .filter((file) => file.endsWith(".js"));
for (const file of functions) {
  require(`./functions/${file}`)(bot);
}

bot.handleEvents();
bot.handleCommands();
bot.handleComponents();
bot.login(token);

http.createServer(function (req, res) {
  res.write("Discord web berjalan");
  res.end();
}).listen(8080);