const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');

module.exports = {
        name: "add-xp",
        run: async (client, message, args) => {
                if (!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");

                const user = message.mentions.users.first() || client.users.cache.get(args[0]);
                if (!user) return message.reply("You must mention someone or give their ID!");

                const xpToAdd = parseInt(args[1], 10);
                if (!xpToAdd) return message.reply("You didn't tell me how many xp to give...")

                client.getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
                client.setScore = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");

                // Get their current xp.
                let score = client.getScore.get(user.id, message.guild.id);
                // It's possible to give xp to a user we haven't seen, so we need to initiate defaults here too!
                if (!score) {
                        score = {
                                id: `${message.guild.id}-${user.id}`,
                                user: user.id,
                                guild: message.guild.id,
                                xp: 0,
                                level: 1
                        }
                }
                score.xp += xpToAdd;

                // We also want to update their level (but we won't notify them if it changes)
                let userLevel = Math.floor(0.1 * Math.sqrt(score.xp));
                score.level = userLevel;

                // And we save it!
                client.setScore.run(score);

                return message.channel.send(`${user.tag} has received ${xpToAdd} xp and now stands at ${score.xp} xp.`);
        }

}
