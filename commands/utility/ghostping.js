const Schema = require('../../models/ghostping')

module.exports = {
  name: 'ghostping',
  description: "Enable/Disable Anti Ghost Ping Module",
  aliases: ['gp'],
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)
    if(!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])) return message.member.send(`I do not have the permission \`MANAGE_SERVER\``)
      
    options = [
      'enable',
      'disable'
    ]

    if (!args.length) return message.channel.send("Please enter either **enable** or **disable**")
    const opt = args[0].toLowerCase();
    if (!opt) return message.channel.send('Please enter either **enable** or **disable**')


    if (!options.includes(opt)) return message.channel.send('Please enter either **enable** or **disable**')

   if(opt == 'enable') {
    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) return message.channel.send(`**Anti Ghost Ping** Module is enabled already`)
      new Schema({
        Guild: message.guild.id
      }).save()
      message.channel.send(`**Anti Ghost Ping** Module has been enabled.`)
    })
   }

   if(opt == 'disable'){
    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return message.channel.send(`**Anti Ghost Ping** Module is disabled already`)
      data.delete()
      message.channel.send(`**Anti Ghost Ping** Module has been disabled.`)
    })
   }

  }
}