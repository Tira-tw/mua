const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat", "l"],
        description: "loop the song currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("讀取中....");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")

        if (queue.repeatMode === 0) {
                client.distube.setRepeatMode(message, 1);
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`🔁\` | **歌曲已循環**`)

                msg.edit({ content: ' ', embeds: [embed] });
            } else {
                client.distube.setRepeatMode(message, 0);
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`🔁\` | **歌曲已解除循環**`)

                msg.edit({ content: ' ', embeds: [embed] });
            }
    }
}
