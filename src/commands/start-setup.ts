import { Client, Message } from "discord.js";

module.exports = {
  name: "start-setup",
  permissions: ["MANAGE_GUILD"],
  /**
   *
   * @param {Client} client
   * @param {Message}message
   * @param {String[]}args
   * @param db
   * @returns
   */
  async run(client, message, args, db) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.reply(`You cannot use this command`);
    let type = args[0];
    let chName = args.slice(1).join(" ");
    if (!type) return message.channel.send("No type was given");
    if (!["voice", "text"].includes(type))
      return message.channel.send("Invalid type given");
    if (!chName)
      return message.channel.send(
        "No channel name was given! Make sure to add `<count>` to it"
      );
    message.reply("Starting setup..");
    message.guild.channels
      .create(`${chName.replace("<count>", message.guild.memberCount)}`, {
        type: type,
      })
      .then((ch) => {
        db.set(`mc_${message.guild.id}`, {
          channelID: ch.id,
          channelName: chName,
          memberCount: message.guild.memberCount,
        });
        db.save();
        message.reply("Set channel!");
      });
  },
};
