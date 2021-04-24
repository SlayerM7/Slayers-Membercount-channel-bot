import { Client, Collection } from "discord.js";
const client = new Client();

const fs = require("fs");
const commands = new Collection();

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

interface cmdInterface {
  run: Function;
  name: string;
  permissions?: String[];
}

require("./utils/counterChannel")(client, db);

client.on("message", async (message) => {
  if (!message.guild) return;
  let prefix = "!";

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (db.has(`prefixes_${message.guild.id}`))
    prefix = db.get(`prefixes_${message.guild.id}`);
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  if (commands.has(command)) {
    let cmd = <cmdInterface>commands.get(command);
    cmd.run(client, message, args, db);
  }
});

client.login("ODE3ODQyMTM3MTEwNTQ0NDM0.YEPY2A.7M1ZKh71DcBi6MdmNBSDBdXWNr4");
