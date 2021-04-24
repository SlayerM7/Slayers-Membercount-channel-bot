module.exports = {
    name: "change-name",
    run(client, message, args, db) {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.reply(`You cannot use this command`);
        if (!db.has(`mc_${message.guild.id}`))
            return message.channel.send("No counter channel set for the server");
        let newName = args.join(" ");
        if (!newName)
            return message.channel.send("No new name was given for the counter channel");
        db.set(`mc_${message.guild.id}.channelName`, newName);
        db.save();
        message.channel.send("Set new counter channel name");
    },
};
