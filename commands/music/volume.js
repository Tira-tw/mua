const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Changes the volume of the music playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("讀取中...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`目前音量 : \`${queue.volume}\`%`)

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`請輸入有效號碼！`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`請提供一個**1**~**100**之間的數字`)

        client.distube.setVolume(message, volume);

        const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **音量已調整:** \`${args[0]}\`%`)

        msg.edit({ content: ' ', embeds: [embed] });

    }
}
