
const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

if (!msg.member.hasPermission("MANAGE_CHANNELS")) {

  msg.reply('You do not have the required permissions to use this.')
  return;

}

  let channel = msg.guild.channels.find(c => c.name === args[0]) || msg.guild.channels.get(args[0]) || msg.mentions.channels.first()
  if (!channel) channel = msg.channel;

let check = channel.permissionsFor(msg.guild.id)
if(!check.has("SEND_MESSAGES")) {
 channel.overwritePermissions({
    permissionOverwrites: [
    {
      id: msg.guild.id,
      allow: ['SEND_MESSAGES'],
    },
    {
      id: msg.guild.id,
      deny: ["MENTION_EVERYONE"],
    },
    ]
  }).then(() => {
msg.reply('Unlocked! :thumbsup:')  
}) 
 
 return;
}

if (channel.type === "voice" || channel.type === "category") return msg.reply("That was a category / voice channel, could not proceed.")

  channel.overwritePermissions({
    permissionOverwrites: [
    {
      id: msg.guild.id,
      deny: ['SEND_MESSAGES'],
    },
    ]
  }).then(() => {
      msg.reply('Locked! :thumbsup:')
  })
 

}


  module.exports.help = {
    name:"lockdown",
    usage: 'Lock a channel down.',
  }