const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
        .setDescription(`\`📛\` | **歌曲已結束**`)
        .setColor('#000001')

    queue.textChannel.send({ embeds: [embed] })
}