const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "resume",
        aliases: ["re"],
        description: "Resumes the music",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("讀取中...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("需要加入語音頻道使用 ||~~不然會太gay~~||")
		
		if (queue.paused) { 
			await client.distube.resume(message);

			const embed = new MessageEmbed()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **歌曲已恢復**`);

			msg.edit({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **歌曲列表已恢復**`);

			msg.edit({ embeds: [embed] });
		}
    }
}
