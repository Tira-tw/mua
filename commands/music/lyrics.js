const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        aliases: [],
        description: "Display lyrics of a song",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("正在搜尋此歌曲...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")

        let song = args.join(" ");
            let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) msg.edit("找不到那首歌的歌詞！");
        } catch (err) {
            console.log(err);
            msg.edit("找不到那首歌的歌詞！");
        }
        let lyricsEmbed = new MessageEmbed()
            .setColor('#000001')
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter({ text: `指令使用者 : ${message.author.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("歌詞太長無法顯示!");
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};