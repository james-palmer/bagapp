// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// check for secure connection
function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https
  if (req.get('X-Forwarded-Proto').includes('https')) {
    next();
  } else {
    res.redirect(`https://${req.hostname}${req.url}`);
  }
}

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(checkHttps);
app.use(express.static('public', { maxAge: 2.628e9 }));
app.use(express.static('swdist'));

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
