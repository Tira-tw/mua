const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new MessageEmbed()
        .setDescription(`**歌曲列表 • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length}) • ${playlist.user}`)
        .setColor('#000001')
  
      queue.textChannel.send({ embeds: [embed] })
}