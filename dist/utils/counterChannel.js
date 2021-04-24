module.exports = (client, db) => {
    setInterval(() => {
        client.guilds.cache.forEach((guild) => {
            if (db.has(`mc_${guild.id}`)) {
                let data = db.get(`mc_${guild.id}`);
                let channel = guild.channels.cache.get(data.channelID);
                if (data.memberCount === guild.memberCount)
                    return console.log(1);
                channel.setName(`${data.channelName.replace("<count>", guild.memberCount)}`);
                db.set(`mc_${guild.id}.memberCount`, guild.memberCount);
            }
            else
                console.log(2);
        });
    }, /*300*/ 10 * 1000);
};
