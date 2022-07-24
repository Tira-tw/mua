const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
    .setColor('#000001')
    .setDescription(`**頻道4空的！**`)

    queue.textChannel.send({ embeds: [embed] })
}