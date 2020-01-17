
exports.run = async (client, msg, args) => {

    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    if (args[0] === "all") {

       let messages = 0;
       let i = true;
       while(i) {
          
       let deleteAble = await msg.channel.messages.fetch({limit: 100})

       if(deleteAble.size < 100) {
       	await msg.channel.bulkDelete(deleteAble)
       	 messages += deleteAble.size;
       	 i = false;
       	 msg.reply('Deleted ' + messages + ' messages.')
       	 messages = 0;
       	 return;
       }

       await msg.channel.bulkDelete(deleteAble)

       messages += deleteAble.size


       }
       
       




    } else if(typeof(parseInt(args[0])) == "number") {
        if (parseInt(args[0]) > 100) return msg.reply(`must be a valid integer below or exact 100, otherwise use !purge all.`)
        let messages = await msg.channel.messages.fetch({ limit: parseInt(args[0]) })
        msg.channel.bulkDelete(messages).then(m => {
            msg.reply('Deleted **' + m.size + '** messages.').then(m => setTimeout(() => {
                m.delete();
            }, 4000))
        })
    }

}

module.exports.help = {
    name:"purge",
    usage: "!purge all | !purge <amount>"
  }