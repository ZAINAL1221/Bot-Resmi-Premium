exports.run = {
   async: async (m, {
      client,
      body
   }) => {
      try {
         global.db.menfess = global.db.menfess ? global.db.menfess : {}
         let mf = Object.values(global.db.menfess).find(v => !v.status && v.receiver == m.sender)
         if (mf && body) {
            if (body == '0x199') return client.reply(m.chat, Func.texted('bold', '🚩 Silahkan ketik pesannya.'), m)
            if (!/conversation|extended/.test(m.mtype)) return client.reply(m.chat, Func.texted('bold', '🚩 Balas dengan teks biasa.'), m)
            let text = `📩 @${mf.receiver.split('@')[0]} replied to your message : _“${body}”_`
            await client.reply(mf.from, text.trim(), null).then(async () => {
               client.sendReact(m.chat, '✅', m.key)
               await Func.delay(1000)
               delete global.db.menfess[mf.id]
               return !0
            })
         }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   private: true,
   cache: true,
   location: __filename
}