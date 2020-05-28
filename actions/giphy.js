const giphyToken = process.env.GIPHY_TOKEN;
const giphy = require("giphy-api")(giphyToken);

function BringGif(tags){
    return giphy.search({"q": tags}).then((res) => {
          console.log(tags); 
          var totalResponses = res.data.length;
          var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponses;
          var gif = res.data[responseIndex].images.original.url; 
          return gif; 
       
      }).catch((err) =>{
          return err; 
      });    
}

function SendGIF(text, tags, color, message, embed) {
    //use it when you want a gif from Giphy
    
       BringGif(tags)
      .then((gif) => {
        
          embed.setColor(color)
          .setDescription(text)
          .setImage(gif);
        message.channel.send({ embed: embed });
      })
      .catch((err) => {
        message.channel.send("Ha habido un error");
        console.log(err);
      });
  }

module.exports.SendGIF = SendGIF; 