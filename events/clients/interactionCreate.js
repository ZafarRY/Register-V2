const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if (interaction.isChatInputCommand()) {
      const { commands } = bot;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, bot);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: `Ada beberapa kesalahan pada code anda!`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = bot;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("Button belum ada scriptnya.");

      try {
        await button.execute(interaction, bot);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = bot;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("Modal belum ada scriptnya.");

      try {
        await modal.execute(interaction, bot);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
