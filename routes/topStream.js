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
   
   const allStream = await fetch ('https://api.twitch.tv/helix/streams', requestOptions);
   const dataStream = await allStream.json ();
   let gameIDs = dataStream.data.map (stream => {
     return stream.game_id;
   });
   let baseURL = 'https://api.twitch.tv/helix/games?';
   let queryParams = '';
   gameIDs.map (id => {
     return (queryParams = queryParams + `id=${id}&`);
   });
   let finalURL = baseURL + queryParams;
   const gameNames = await fetch (finalURL, requestOptions);
   const gameNameArray = await gameNames.json ();
   
   let finalArray = dataStream.data.map (stream => {
     stream.gameName = '';git remote add origin git@github.com:JohnSheff/Twitch-Platforms.git
     gameNameArray.data.map (name => {
       if (stream.game_id === name.id) {
         return (stream.gameName = name.name);
       }
     });
     
     let newURL = stream.thumbnail_url
      .replace ('{width}', '500')
      .replace ('{height}', '300');
     stream.thumbnail_url = newURL;
     return stream;
   });
   
   res.render ('topStream', {channel: finalArray});
 });

module.exports = router;