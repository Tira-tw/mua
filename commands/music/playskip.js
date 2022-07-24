const { Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "playskip",
        description: "Plays a song from the source.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
      //  message.channel.send(`**Searching.....** \`${args.join(" ")}\``).then(msg => {
      //      setTimeout(() => msg.delete(), 5000)
      //  })
        
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("需要加入語音頻道使用 ||~~不然會太gay~~||")
        if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "我沒有權限使用指令 , 請查看頻道權限!", color: "#000001" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `我沒有權限加入${channel.name}請查看頻道權限!`, color: "#000001" } });

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("請提供歌曲名稱或連結");
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message,
            skip: true
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
