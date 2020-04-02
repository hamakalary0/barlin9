const fs = require('fs')
module.exports.run = async (client, msg, args) => {

	let files = fs.readdirSync("./images")


    if(isNaN(args[0]) || !args[0]) return msg.reply(`You forgot to pick a number between 1 to ${files.length - 1}`) 
	let i = parseInt(args[0])

	if(i > files.length) return msg.reply('I could not find that image.')
	let format;
	if(files[i].endsWith(".undefined")) return;
	if(files[i].endsWith(".png")) format = "png";
	if(files[i].endsWith('.jpeg')) format = "jpeg"
	if(files[i].endsWith(".jpg")) format = "jpg";
	if(files[i].endsWith(".gif")) format = "gif";
	msg.channel.send({ files: [ { attachment: `./images/${files[i]}`, name:`test.${format}`}]})
   

 
 


}

exports.help = {
	name:"snipeimages",
	usage: "snipeimages"
}