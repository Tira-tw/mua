const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    config: {
        name: "support",
        aliases: ["s"],
        category: "utilities",
        description: "Support",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#000001")
        .setAuthor({ name: "Bot支援群"})
        .setDescription("```加入這裡可跟我們回報錯誤訊息/閒聊... 都可!```")
        .setTimestamp()
        .setFooter({ text: `指令使用者 : ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("邀請連結")
                    .setURL(`https://discord.gg/TQHs5R3NpJ`)
                    .setEmoji("🔗")
                    .setStyle("LINK")
            )
        
        message.channel.send({ embeds: [embed], components: [row] });
    }
}
