module.exports = {
  name: "prefix",
  run(client, message, args, db) {
    let curPrefix = db.has(`prefixes_${message.guild.id}`)
      ? db.get(`prefixes_${message.guild.id}`)
      : "!";
    if (!args[0]) {
      return message.reply(`Current prefix: ${curPrefix}`);
    }
    db.set(`prefixes_${message.guild.id}`, args.join(" "));
    db.save();
    message.reply("Prefix has been set!");
  },
};
