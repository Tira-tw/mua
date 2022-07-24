const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, result, query) => {
    let i = 0
    let embed = new MessageEmbed()
        .setColor("#000001")
        .setTitle(`歌曲選擇...`)
        .setDescription(`${result.map(song => `**(${++i}.) [${song.name}](${song.url})** - \`${song.formattedDuration}\``).join("\n")}`)
        .setFooter({ text: `請在30秒內選擇一首歌曲!` });

    message.channel.send({ embeds: [embed] });
}