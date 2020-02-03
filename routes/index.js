const express = require ('express');
const router = express.Router ();
const fetch = require ('node-fetch');
const requestOptions = {
  headers: {
    'Client-ID': process.env.TOKEN
  }
};


router.route ('/')
 .get (async function (req, res) {
    const resp = await fetch ('https://api.twitch.tv/helix/games/top', requestOptions);
   const data = await resp.json ();
     let finalArray = data.data.map (game => {
     let newURL = game.box_art_url
      .replace ('{width}', '500')
      .replace ('{height}', '500');
     game.box_art_url = newURL;
     return game;
   });
   // console.log (finalArray);
   res.render ('index', {finalArray});
 });

module.exports = router;


