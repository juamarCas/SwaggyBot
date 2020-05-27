const giphyToken = process.env.GIPHY_TOKEN;
const giphy = require("giphy-api")(giphyToken);

function BrignGif(tags){
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
module.exports.BrignGif = BrignGif; 