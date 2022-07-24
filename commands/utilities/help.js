const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "utilities",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        console.log(chalk.magenta(`使用help功能用戶: ${message.author.tag} \n伺服器: ${message.guild.name}`));
        const embed = new MessageEmbed()
            .setColor('#000001')
            .setAuthor({ name: `${message.guild.me.displayName} 功能列表`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`主要Prefix : **${client.prefix}**`)
            embed.setFooter({ text: `© ${message.guild.me.displayName} | 功能數量: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("功能無效").setDescription(`使用 \`${client.prefix}help\` 是你最信賴的選擇xD`)] })
            command = command.config

            embed.setDescription(stripIndents`主要Prefix: \`${client.prefix}\`\n
            **功能:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **描述:** ${command.description || "未提供說明awa"}
            **Usage:** ${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : "NOPE"}
            **指令授權 by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}