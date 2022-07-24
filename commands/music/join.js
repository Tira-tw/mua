const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "join",
        aliases: ["summon", "j"],
        description: "is join",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("讀取中....");

		const { channel } = message.member.voice;
		if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "我沒有權限使用!", color: "#000001" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `我沒有權限加入 ${channel.name}`, color: "#000001" } });

        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new MessageEmbed()
					.setColor("#000001")
					.setDescription(`必須在同一個頻道 ${message.client.user}`);

				return msg.edit({ content: ' ', embeds: [embed] });
			} else {
				const embed = new MessageEmbed()
					.setColor("#000001")
					.setDescription(`我已經在你的KTV語音頻道了`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new MessageEmbed()
							.setColor('#000001')
							.setDescription(`\`🔊\` | **已加入語音頻道:** \`${memberVoice.name}\``)

                        msg.edit({ content: ' ', embeds: [embed] });
					})
					.catch(error => {
						console.log(e);
					})

				
			} else {
				const embed = new MessageEmbed()
					.setColor("#000001")
					.setDescription(`必須在語音頻道！`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		}
    }
}
