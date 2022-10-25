  const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
        name: "daily",
        run: async (client, message, args) => {

    let result = await cs.daily({
        user: message.author,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.channel.send(`You have used daily recently Try again in ${result.time}`);
    else message.channel.send(`You have earned $${result.amount}.`)
}

};