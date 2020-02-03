const express = require ('express');
const router = express.Router ();
const fetch = require ('node-fetch');
const requestOptions = {
  headers: {
    'Client-ID': process.env.TOKEN
  }, redirect: 'follow'
};

router.route ('/:id')
 .get (async function (req, res) {
   const resp = await fetch (`https://api.twitch.tv/helix/streams?game_id=${req.params.id}`, requestOptions);
   const data = await resp.json ();
   const response = await fetch ('https://api.twitch.tv/helix/games/top', requestOptions);
   const date = await response.json ();
   const nameChannel = date.data.filter ((id) => id.id === req.params.id);
   let finalArray = data.data.map (stream => {
     let newUrl = stream.thumbnail_url
      .replace ('{width}', '500')
      .replace ('{height}', '300');
     stream.thumbnail_url = newUrl;
     return stream;
   });
   
   let totalViewers = finalArray.reduce ((acc, value) => {
     return acc + value.viewer_count;
   }, 0);
   
      res.render ('stream', {stream: finalArray, totalViewers, name: nameChannel.name});
 });

module.exports = router;