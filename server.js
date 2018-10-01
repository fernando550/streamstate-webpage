// PACKAGES
require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Twit = require('twit');
const XLSX = require('xlsx');
const Timeout = require('await-timeout');

// START EXPRESS APP ROUTING
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// SERVE STATIC FILES FROM REACT
app.use(express.static(path.join(__dirname, 'client/build')));

// LOGIN REQUEST
app.post('/ttapi/login', async (req, res) => {
  console.log('client login request: ', req.body);
  if (req.body.userName == process.env.login_name && req.body.passWord == process.env.login_password) {
    console.log('client login successful');
    res.send({confirmation: true, error: false});
  }
	else {
    console.log('client login failed');
		res.send({confirmation: false, error: true});
	}
});

// PROGRAM INITIALIZATION
app.post('/ttapi/userparse1', async (req, res) => {
  console.log('Route accessed: /ttapi/userparse1');
  let T;
  try {
    T = new Twit({
      consumer_key: process.env.consumer_key,
      consumer_secret: process.env.consumer_secret,
      app_only_auth: true
      // timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    });
    console.log('Twit Object: \n', true);
  } catch (err) {
    console.log('Twit Object error: \n', err);
  }

  const defaultParams = {screen_name: req.body.data};
  console.log('user: \n', defaultParams);
  //start call
  T.get("friends/ids", defaultParams, async (error, data) => {
    res.send(data.ids);
  });
});

app.post('/ttapi/userparse2', async (req, res) => {
  console.log('Route accessed: /ttapi/userparse2');
  let T;
  try {
    T = new Twit({
      consumer_key: process.env.consumer_key,
      consumer_secret: process.env.consumer_secret,
      app_only_auth: true
      // timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    });
    console.log('Twit Object: \n', true);
  } catch (err) {
    console.log('Twit Object error: \n', err);
  }

  console.log('userlist exists?: \n', (req.body.data.length > 0 ? true : false));
  //start call
  T.get("users/lookup", {user_id: req.body.data}, async (error, data) => {
    res.send(data);
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}`);
