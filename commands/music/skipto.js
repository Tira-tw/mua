const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skipto",
        aliases: ["st"],
        description: "Skip to a song in the queue.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("讀取中...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`請輸入有效號碼！`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        await client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`⏭\` | **指定歌曲已跳過:** ${args[0]}`)

                msg.edit({ content: ' ', embeds: [embed] });
            });
    }
}
