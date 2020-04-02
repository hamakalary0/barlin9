
const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {
    if(!['685675290176913504', '667098393251938364', '524685495301832727', '537060772581343232', '235358201430802432'].includes(msg.author.id)) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      msg.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

}
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

  module.exports.help = {
    name:"eval",
    usage: 'Only for developers, thats all u gotta know',
    group: "developer"
  }