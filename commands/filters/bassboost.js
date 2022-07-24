const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = {
    config: {
        name: "bassboost",
        description: "音樂提升低音增強^upup^",
        category: "filters",
        accessableby: "Member",
        aliases: ["bb"]
    },
    run: async (client, message) => {
        const msg = await message.channel.send("讀取中....")
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")

        client.distube.setFilter(message, "bassboost")

        const embed = new MessageEmbed()
            .setAuthor({ name: '開啟功能： Bassboost', iconURL: 'https://cdn.discordapp.com/emojis/992269275995848825.gif?size=96&quality=lossless'})
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: ' ', embeds: [embed] })
    }
}; /// testing version