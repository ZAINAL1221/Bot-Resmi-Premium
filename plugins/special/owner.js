exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], m, {
         org: "Pak Zainal Dev's Network",
         website: 'https://api.neoxr.my.id',
         website: 'https://hagozox.repl.co/',
         email: 'hagozox@gmail.com'
      })
   },
   error: false,
   cache: true,
   location: __filename
}