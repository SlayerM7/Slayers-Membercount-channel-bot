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
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
const fs = require("fs");
const commands = new discord_js_1.Collection();
let files = fs.readdirSync("./dist/commands");
files.forEach((file) => {
    let pull = require(`./commands/${file}`);
    commands.set(pull.name, pull);
});
const { slayersDB } = require("slayer.db");
const db = new slayersDB({
    saveReadable: true,
    saveInternal: {
        func: true,
        dir: "database",
    },
});
require("./utils/counterChannel")(client, db);
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.guild)
        return;
    let prefix = "!";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (db.has(`prefixes_${message.guild.id}`))
        prefix = db.get(`prefixes_${message.guild.id}`);
    if (message.author.bot || !message.content.startsWith(prefix))
        return;
    if (commands.has(command)) {
        let cmd = commands.get(command);
        cmd.run(client, message, args, db);
    }
}));
client.login("ODE3ODQyMTM3MTEwNTQ0NDM0.YEPY2A.7M1ZKh71DcBi6MdmNBSDBdXWNr4");
