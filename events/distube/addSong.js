const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, song) => {
    let embed = new MessageEmbed()
    .setDescription(`**歌曲列表 • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
    .setColor('#000001')

    queue.textChannel.send({ content: ' ', embeds: [embed] })
}