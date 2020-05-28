const { Client, MessageEmbed, MessageAttachment, VoiceChannel, Guild } = require("discord.js");
const giphy = require("./actions/giphy");
const audios = require("./actions/audios");
const flip = require('./actions/flipAcoin'); 
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const DiscordToken = process.env.DISCORD_TOKEN;
const client = new Client();
const guild = new Guild(client, Object()); 
var color = "0xff0000";
var newColor = "0x00ff00";
const PREFIX = "-";


client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`); //este método es, cuando el bot esté listo, ejecute la función

});

client.on("message", (message) => {
  console.log(message.content);
  switch (message.content) {
    case `${PREFIX}test`:
      message.channel.send(`Thanks for testing ${message.author}`);
      break;

    case `${PREFIX}help`:
      fs.readFile("commands.txt", (err, buf) => {
        const embed = new MessageEmbed()
          .setTitle("Command list")
          .setColor("0xff0000")
          .setDescription(buf.toString());
        message.channel.send(embed);
        // fs.close("commands.txt");
      });
      break;

    case `${PREFIX}flip`:
      var cc = flip.tossCoin(); 
      const text = `${message.author} flipped a coin and the result is: ${cc}`;
      const tags = "flip a coin";
      let embed = new MessageEmbed(); 
      giphy.SendGIF(text, tags, color, message, embed);
      break;

    case `${PREFIX}wololo`:
      const directory = path.join(__dirname, "gifs", "wololo.gif");
      var attatchment = new MessageAttachment(directory);
      message.channel.send(`${message.author} ha wololoseado el servidor`); 
      message.channel.send(attatchment);
      break;

    case `${PREFIX}o`:
      var voiceChannel = new VoiceChannel(guild, Object());
      voiceChannel.join().then((connection) => {
        console.log("Connected");
      }).catch((e) => {
        console.log("Error"); 
      });
      break;
  }

  if (message.content.startsWith(`${PREFIX}insult`)) {
    const user = message.mentions.users.first();
    if (user) {
      console.log("Hay algo en user");
      message.channel.send(`${user} eres una guisa`);
    }
  }

  if (message.content.startsWith(`${PREFIX}trompa`)) {
    const user = message.mentions.users.first();
    if (user) {
      const text = `${message.author} le pegó una trompá a ${user}`;
      const tags = "onepunchman, onepunch, saitama, anime";
      let embed = new MessageEmbed(); 
      giphy.SendGIF(text, tags, color, message, embed);
    }
  }
});


client.login(DiscordToken);
