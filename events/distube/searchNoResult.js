const { MessageEmbed } = require("discord.js");

module.exports = async (client, query, queue) => {
    const embed = new MessageEmbed()
        .setColor("#000001")
        .setDescription(`沒有找到結果 ${query}!`)

    queue.textChannel.send({ embeds: [embed] })
}