const { MessageEmbed } = require("discord.js");
const pagequeue = require('../../structures/pagequeue.js');

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "que"],
        description: "Diplay the queue",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) message.channel.send(`沒有任何音樂！`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("需要加入語音頻道使用 ||~~不然會太gay~~||")

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const qduration = queue.formattedDuration;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(
				`**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new MessageEmbed()
                .setAuthor({ name: `歌曲列表 - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor('#000001')
				.setDescription(`**目前正在播放:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**其餘列表**${str == '' ? '  沒有' : '\n' + str }`)
				.setFooter({ text: `列表頁數 • ${i + 1}/${pagesNum} | ${queue.songs.length} • 歌曲 | ${queue.formattedDuration}`});
			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && queue.songs.length > 10) pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('頁數必須是數字!');
			if (args[0] > pagesNum) return message.channel.send(`只有 ${pagesNum} 頁數可用!`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
}
