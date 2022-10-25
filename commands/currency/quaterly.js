const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
        name: "quaterly",
        aliases: ["qua"],
        run: async (client, message, args) => {

    let result = await cs.quaterly({
        user: message.author,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.channel.send(`You have used quaterly recently Try again in ${result.time}`);
    else message.channel.send(`You have earned $${result.amount}.`)
}

};