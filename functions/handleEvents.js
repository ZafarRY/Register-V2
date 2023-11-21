const fs = require("fs");

module.exports = (bot) => {
  bot.handleEvents = async () => {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
      const eventsFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "clients":
          for (const file of eventsFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once)
              bot.once(event.name, (...args) => event.execute(...args, bot));
            else bot.on(event.name, (...args) => event.execute(...args, bot));
          }
          break;

        default:
          break;
      }
    }
  };
};
