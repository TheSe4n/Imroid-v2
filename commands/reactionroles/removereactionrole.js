const Guild = require('../../database/guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("../../packages/reactionrole/index.js")
const react = new ReactionRole()
const config = require("../../config.json");
react.setURL("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data")

module.exports = {
        name: 'removerr',
        aliases: ["removereactionrole", "rreactionrole", "deletereactionrole", "delreactionrole", "remrr", "delrr", 'delreaction', 'deletereaction'],
        description: 'Delete a reaction role',
        run: async(client, message, args) => {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

      
    
    let fail = message.client.emoji.fail
      let success = message.client.emoji.success
  const missingPermEmbed = new MessageEmbed()
  .setAuthor(`Missing User Permissions`, message.author.displayAvatarURL())
  .setDescription(`${fail} The following command the **Administrator** Permission`)
   .setColor(client.color.red)

      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(ch => ch.name === args[0])
    if (!channel) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Channel`)
   .setColor(client.color.red)
    );
    
    let ID = args[1]
    if(!ID) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid message ID`)
    );
    let messageID = await channel.messages.fetch(ID).catch(() => { return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} I could not find the following ID`)
   .setColor(client.color.red)
    ); })

           let emoji = args[2]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Emoji`)
   .setColor(client.color.red)
    );

  
    
    if (isCustomEmoji(args[2])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Do Not use custom Emojis!`)
   .setColor(client.color.red)
    );
    
   

    await react.reactionDelete(client, message.guild.id , ID, emoji);
    
     message.channel.send(new MessageEmbed()
   .setColor(client.color.green)
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Deleted The [Reaction Role](${messageID.url})`)
)
  


        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    
    }
};