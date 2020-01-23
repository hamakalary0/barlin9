const { MessageEmbed } = require('discord.js')

let choices = ["y", "n", "yes", "no"]

exports.run = async (client, msg, args) => {

   let user = client.users.get(args[0]) || msg.mentions.users.first() 

   if (!user) return msg.reply('Invalid arguments, you forgot to mention a user.')
   let index = client.settings.get(msg.guild.id, "userchannels").findIndex(obj => obj.author === msg.author.id)
   let array = client.settings.get(msg.guild.id, "userchannels")
   if (msg.member.voiceChannelID === client.channels.get(array[index].channel) && array[index].author === msg.author.id) return msg.reply(':x:, either you do not have a voice channel or you are not the owner of ur voicechannel.')
   if (!msg.guild.member(user).voiceChannel) return msg.reply('This user is not in their voice channel.')


   msg.channel.send(`Kicked **${user.tag}** from ur voicechannel :thumbsup:`)

   let channel = client.channels.get(client.settings.get(msg.guild.id, `userchannels.${client.settings.get(msg.guild.id, "userchannels").findIndex(obj => obj.author === msg.author.id)}.channel`))
   channel.overwritePermissions({
    permissionOverwrites: [
      {
        id: user.id,
        deny:['CONNECT'],
      },
    ],
      reason: 'Updated user channel!'
    });

    user.setVoiceChannel(null);
    

}


exports.help = {
    name:"join",
    usage:"!join <user>"
}
