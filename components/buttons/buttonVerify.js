const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'verify',
  },
  async execute(interaction) {
    const role = process.env['VERIFY_ROLE'];

    const embed = new EmbedBuilder()
      .setColor('#00FFFB')
      .setTitle('**BERHASIL**')
      .setDescription('Berhasil verifikasi.');
    
    if(interaction.member.permissions.has(PermissionFlagsBits.Administrator))
    return await interaction.reply({
        content:
          "Anda tidak bisa menggunakan register panel ini karena anda ADMINISTRATOR.",
        ephemeral: true,
      });
    

  if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
    {
      interaction.member.roles.add(role);
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
}