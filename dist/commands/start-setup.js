"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    run(client, message, args, db) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.hasPermission("MANAGE_GUILD"))
                return message.reply(`You cannot use this command`);
            let type = args[0];
            let chName = args.slice(1).join(" ");
            if (!type)
                return message.channel.send("No type was given");
            if (!["voice", "text"].includes(type))
                return message.channel.send("Invalid type given");
            if (!chName)
                return message.channel.send("No channel name was given! Make sure to add `<count>` to it");
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
        });
    },
};
