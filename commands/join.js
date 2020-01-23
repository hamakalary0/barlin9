const { MessageEmbed } = require('discord.js')

let choices = ["y", "n", "yes", "no"]

exports.run = async (client, msg, args) => {

   let user = client.users.get(args[0]) || msg.mentions.users.first() 

   if (!user) return msg.reply('Invalid arguments, you forgot to mention a user.')
   if (client.settings.get(msg.guild.id, "userchannels").findIndex(obj => obj.author === user.id) < 0) return msg.reply('Invalid arguments, that user did not have a userchannel.')

   if (!msg.guild.member(user).voiceChannel) return msg.reply('This user is not in their voice channel.')

   let message = await msg.channel.send(`${user} do you accept ${msg.author} to access your voicechannel? **yes** or **no**`)


   let choice = await msg.channel.awaitMessages(res => res.author.id === user.id, {
       max: 1,
       time: 30000,
   })

   if (!choice.size) return msg.reply('30 seconds passed without an answer, I guess they did not want you in their VC.')

   if (!choices.includes(choice.first().content.toLowerCase())) return msg.reply('I did not understand that answer, I am sorry.')
   

   if (['y', "yes"].includes(choice.first().content.toLowerCase())) {
   let channel = client.channels.get(client.settings.get(msg.guild.id, `userchannels.${client.settings.get(msg.guild.id, "userchannels").findIndex(obj => obj.author === user.id)}.channel`))
   channel.overwritePermissions({
    permissionOverwrites: [
      {
        id: msg.author.id,
        allow: ['CONNECT'],
      },
    ],
      reason: 'Updated user channel!'
    });

   } else if(['n', 'no'].includes(choice.first().content.toLowerCase())) {
       msg.channel.send('He did not want you to join his vc!')
       return;
   }

}


exports.help = {
    name:"join",
    usage:"!join <user>"
}
