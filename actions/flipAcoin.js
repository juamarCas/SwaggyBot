function tossCoin(){
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

      return cc; 
}

module.exports.tossCoin = tossCoin;