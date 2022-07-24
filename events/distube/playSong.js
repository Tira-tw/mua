const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, queue, track) => {
      var newQueue = client.distube.getQueue(queue.id)
      var data = disspace(newQueue, track)

      const nowplay = await queue.textChannel.send(data)

      const filter = (message) => {
        if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: "需要加入語音頻道使用 ||~~不然會太gay~~||", ephemeral: true });
        }
      };
      const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

      collector.on('collect', async (message) => {
        const id = message.customId;
        const queue = client.distube.getQueue(message.guild.id);
        if(id === "pause") {
        if(!queue) {
            collector.stop();
        } 
        if (queue.paused) { 
          await client.distube.resume(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`⏯\` | **歌曲已恢復**`);
    
          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.pause(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`⏯\` | **歌曲已暫停**`);
    
          message.reply({ embeds: [embed], ephemeral: true });
        }
        } else if (id === "skip") {
          if(!queue) {
            collector.stop();
          }
          if (queue.songs.length === 1) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription("\`🚨\` | **你知道沒有歌曲嗎?**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.skip(message)
            .then(song => {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription("\`⏭\` | **歌曲已跳過**")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
            });
          }
        } else if(id === "stop") {
          if(!queue) {
            collector.stop();
          }
  
          await client.distube.stop(message.guild.id);
  
          const embed = new MessageEmbed()
              .setDescription(`\`🚫\` | **歌曲已暫停**`)
              .setColor('#000001');
          
          await nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "loop") {
          if(!queue) {
            collector.stop();
          }
          if (queue.repeatMode === 0) {
            client.distube.setRepeatMode(message.guild.id, 1);
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`\`🔁\` | **歌曲已循環**`)

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
            client.distube.setRepeatMode(message.guild.id, 0);
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`\`🔁\` | **歌曲已解除循環**`)

            message.reply({ embeds: [embed], ephemeral: true });
          }
        } else if (id === "previous") {
          if(!queue) {
            collector.stop();
          }
          if (queue.previousSongs.length == 0) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription("\`🚨\` | **你知道沒有歌曲嗎?**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.previous(message)
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription("\`⏮\` | **歌曲已讀取**")

                nowplay.edit({ components: [] });
                message.reply({ embeds: [embed], ephemeral: true });
            }
        }
      });
      collector.on('end', async (collected, reason) => {
        if(reason === "time") {
          nowplay.edit({ components: [] });
        }
      });
  }

  function disspace(nowQueue, nowTrack) {
    const embeded = new MessageEmbed()
    .setAuthor({ name: `開始播放`, iconURL: 'https://cdn.discordapp.com/emojis/952207663813509190.gif?size=96&quality=lossless'})
    .setThumbnail(nowTrack.thumbnail)
    .setColor('#000001')
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addField(`影片創作者:`, `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, true)
    .addField(`指令使用者:`, `${nowTrack.user}`, true)
    .addField(`音量:`, `${nowQueue.volume}%`, true)
    .addField(`音樂速度:`, `${nowQueue.filters.join(", ") || "正常"}`, true)
    .addField(`自動播放:`, `${nowQueue.autoplay ? "有自動播放" : "沒有自動播放"}`, true)
    .addField(`音樂時間:`, `${nowQueue.formattedDuration}`, true)
    .addField(`音樂時間: \`[0:00 / ${nowTrack.formattedDuration}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
    .setTimestamp()

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("pause")
        .setEmoji("⏯")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setEmoji("⬅")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("stop")
        .setEmoji("✖")
        .setStyle("DANGER")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("skip")
        .setEmoji("➡")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("loop")
        .setEmoji("🔄")
        .setStyle("SUCCESS")
    )
    return {
      embeds: [embeded],
      components: [row]
    }
  }