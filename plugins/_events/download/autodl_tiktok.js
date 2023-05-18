exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      prefixes
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.ttFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('tiktok', m.sender)
               links.map(async link => {
                  let json = await Api.tiktok(Func.ttFixed(link))
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  let caption = `乂  *T I K T O K*\n\n`
                  caption += `	◦  *Author* : ${json.data.author.nickname} (@${json.data.author.username})\n`
                  caption += `	◦  *Views* : ${Func.h2k(json.data.stats.play_count)}\n`
                  caption += `	◦  *Likes* : ${Func.h2k(json.data.stats.digg_count)}\n`
                  caption += `	◦  *Shares* : ${Func.h2k(json.data.stats.share_count)}\n`
                  caption += `	◦  *Comments* : ${Func.h2k(json.data.stats.comment_count)}\n`
                  caption += `	◦  *Duration* : ${Func.toTime(json.data.duration)}\n`
                  caption += `	◦  *Sound* : ${json.data.music.title} - ${json.data.music.author}\n`
                  caption += `	◦  *Caption* : ${json.data.caption || '-'}\n\n`
                  caption += global.footer
                  client.sendButton(m.chat, json.data.video, caption, ``, m, [{
                     buttonId: `${prefixes[0]}tikmp3 ${link}`,
                     buttonText: {
                        displayText: 'Backsound'
                     },
                     type: 1
                  }])
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}