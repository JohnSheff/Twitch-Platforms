const express = require ('express');
const router = express.Router ();
const fetch = require ('node-fetch');
const requestOptions = {
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': process.env.TOKEN
  }
};

router.route ('/search')
 .get (async (req, res) => {
   const uri = `https://api.twitch.tv/kraken/search/games?query=${req.query.name}`;
   const encoded = encodeURI (uri);
   const resp = await fetch (encoded, requestOptions);
   const data = await resp.json ();
   let finalArray;
   if(data.games){
   finalArray = data.games.map (game => {
     let newURL = game.box.template
      .replace ('{width}', '500')
      .replace ('{height}', '500');
     game.box_art_url = newURL;
     let newID=game._id;
     game.id=newID
     return game;
   });}
   // console.log (finalArray);
    res.render ('index',{finalArray});
 });


module.exports = router;