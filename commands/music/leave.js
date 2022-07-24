const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "leave",
        aliases: ["lev", "stop", "dc"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("讀取中....");
        const queue = client.distube.getQueue(message);
		if (!queue) return msg.edit(`沒有任何音樂！`)
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new MessageEmbed()
                .setDescription(`\`🚫\` | **已離開:** | \`${memberVoice.name}\``)
                .setColor('#000001')

            msg.edit({ content: ' ', embeds : [embed] });

        }

    }
}
