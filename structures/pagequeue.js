const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = async (client, message, pages, timeout, queueLength, queueDuration) => {
    if (!message && !message.channel) throw new Error('頻道無法加入');
    if (!pages) throw new Error('沒有給出頁面');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.channel.send({ embeds: [pages[page].setFooter({ text: `頁數 • ${page + 1}/${pages.length} | ${queueLength} • 歌曲 | ${queueDuration} • 總持續時間`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (interaction) => interaction.user.id === message.author.id ? true : false && interaction.deferUpdate();
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `頁數 • ${page + 1}/${pages.length} | ${queueLength} • 歌曲 | ${queueDuration} • 總持續時間`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `頁數 • ${page + 1}/${pages.length} | ${queueLength} • 歌曲 | ${queueDuration} • 總持續時間`})], components: [disabled] })
    });
    return curPage;
};