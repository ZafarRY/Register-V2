const { readdirSync } = require("fs");

module.exports = (bot) => {
  bot.handleComponents = async () => {
    const componentFolders = readdirSync(`./components`);
    for (const folder of componentFolders) {
      const commponentFiles = readdirSync(`./components/${folder}`).filter(
        (file) => file.endsWith(".js")
      );

      const { buttons, modals } = bot;

      switch (folder) {
        case "buttons":
          for (const file of commponentFiles) {
            const button = require(`../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          }
          break;

        case "modals":
          for (const file of commponentFiles) {
            const modal = require(`../components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
          }
          break;

        default:
          break;
      }
    }
  };
};
