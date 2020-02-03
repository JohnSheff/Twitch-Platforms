const express = require ('express');
const path = require ('path');
const logger = require ('morgan');
const http = require ('http');
const indexRouter = require ('./routes/index');
const gameRouter = require ('./routes/game');
const streamRouter = require ('./routes/topStream');
const searchRouter = require ('./routes/search');
const app = express ();
// const server = http.createServer (app);

http.createServer (app).listen (process.env.PORT || 3000)
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'hbs');
app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: true}));
app.use ('/', indexRouter);
app.use ('/game/', gameRouter);
app.use ('/top-streams', streamRouter);
app.use ('/', searchRouter);
// server.listen (3000);