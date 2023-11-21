const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-verify')
    .setDescription('Setup panel verify.')
    .addChannelOption((option) => 
      option
       .setName('channel')
       .setDescription('Pilih channel yang mau dibuat verify.')
       .setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
      return await interaction.reply({
        content: "Anda bukan admin dari server ini.",
        ephemeral: true,
      });
    
    const embedChannel = new EmbedBuilder()
      .setColor('#00FFFB')
      .setTitle('**Verification**')
      .setDescription(`Silakan verify dulu untuk mengakses channel.`);

    const embedReply = new EmbedBuilder()
      .setColor('#00FFFB')
      .setDescription(`Verify berhasil dibuat di ${channel}!`);

    const button = new ButtonBuilder()
      .setCustomId('verify')
      .setLabel('✅ Verify')
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({embeds: [embedReply], ephemeral: true});

    await channel.send({embeds: [embedChannel], components: [row]});
  },
};