
const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    if (!args[0]) return msg.reply('Invalid arguments, I could not find that user.')
    let getUser;
    try {
    getUser = await client.users.fetch(args[0])
    } catch(e) {
      getUser = false;
    }

    if (getUser) {
         msg.guild.members.ban(getUser.id)
         msg.reply(`***-${getUser.tag}*** has been banned.`).then(m => m.delete({timeout: 5000}))
         return;
    }
 
    let user = msg.guild.members.find(mem => mem.user.username.toLowerCase().startsWith(args[0].toLowerCase())) || msg.mentions.users.first()

    if (user) {
      if(!msg.guild.member(user).bannable) return msg.reply('This user has a higher role than me or is an `ADMINISTRATOR`.')
    msg.reply('Banned user ***' + client.users.get(user.id).tag + '***.')
     msg.guild.member(user).ban()
     return;
    }

    if(!user && !getUser) {
      msg.reply('Invalid arguments, I could not find that user.')
      return;
    }


}

  module.exports.help = {
    name:"ban",
    usage: '!ban <user || userid || username>',
  }