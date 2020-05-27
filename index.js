const { Client, MessageEmbed, MessageAttachment } = require("discord.js");
const giphy = require("./modules/giphy");
const fs = require("fs");
require('dotenv').config();
const DiscordToken = process.env.DISCORD_TOKEN; 
const client = new Client();

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
      var result = Math.floor(Math.random() * (3 - 1) + 1);
      var cc;
      console.log(result);
      switch (result) {
        case 1:
          cc = "Tail";
          break;

        case 2:
          cc = "Head";
          break;
      }
      const text = `${message.author} flipped a coin and the result is: ${cc}`;
      const tags = "flip a coin";
      const color = "0xff0000";
      PrintGIF(text, tags, color, message);
      break;

    case `${PREFIX}wololo`:
      var attatchment = new MessageAttachment("./gifs/wololo.gif");
      message.channel.send(attatchment);
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
      const tags = "onepunchman, onepunch, saitama,anime";
      const color = "0xff0000";
      PrintGIF(text, tags, color, message);
    }
  }
});

function PrintGIF(text, tags, color, message) {
  giphy.BrignGif(tags).then((gif) => {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(text)
      .setImage(gif);
    message.channel.send({ embed: embed });
  }).catch(err =>{
    message.channel.send("Ha habido un error");
    console.log(err); 
  });
}

client.login(DiscordToken);
