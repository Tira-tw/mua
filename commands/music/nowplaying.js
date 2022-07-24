const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["np", "now", "n"],
        description: "Displays the current song playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('正在搜尋此歌曲...');

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new MessageEmbed()
            .setAuthor({ name: queue.songs[0].playing ? '歌曲暫停' : '現在播放', iconURL: "https://images-ext-1.discordapp.net/external/nIXYx_QgpeGPz4xXYVF8TKouYHrhGMlbwZP96qZh6Kc/%3Fsize%3D96%26quality%3Dlossless/https/cdn.discordapp.com/emojis/952207663813509190.gif"})
            .setColor('#000001')
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addField('影片創作者:', `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, true)
            .addField('指令使用者:', `${queue.songs[0].user}`, true)
            .addField('音量:', `${queue.volume}%`, true)
            .addField('點閱率', `${queue.songs[0].views}`, true)
            .addField('喜歡:', `${queue.songs[0].likes}`, true)
            .addField('不喜歡:', `${queue.songs[0].dislikes}`, true)
            .addField(`目前歌曲時間: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
            .setTimestamp()

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
