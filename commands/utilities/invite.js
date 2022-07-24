const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    config: {
        name: "invite",
        aliases: ["i"],
        category: "utilities",
        description: "is invite",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#000001")
        .setAuthor({ name: "邀請"})
        .setDescription("```邀請我讓你的伺服器變成KTV!```")
        .setTimestamp()
        .setFooter({ text: `指令使用者 : ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("邀請連結")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=412320386112&scope=bot`)
                    .setEmoji("🔗")
                    .setStyle("LINK")
            )
        
        message.channel.send({ embeds: [embed], components: [row] });
    }
}
