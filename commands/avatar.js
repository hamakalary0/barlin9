
exports.run = async (client, msg, args) => {

let user = msg.mentions.users.first() || client.users.get(args[0])
  if (!user) return msg.reply('Invalid arguments, can not find user.')

  msg.channel.send(user.displayAvatarURL({format: 'png', size: 2048}))

}

exports.help = {
	name:"av",
	usage: "av <user>"
}