// PACKAGES
// require('dotenv').config()
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
  console.log('Entered credentials for client login request: ', req.body);
  if (req.body.username == process.env.login_name && req.body.password == process.env.login_password) {
    console.log('client login successful');
    res.send({confirmation: true, error: false});
  }
	else {
    console.log('client login failed');
		res.send({confirmation: false, error: true});
	}
});

// PROGRAM INITIALIZATION
app.post('/ttapi/getFriendIDs', async (req, res) => {
  console.log('Route accessed: /ttapi/getFriendIDs');
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
    console.log('Twit Object Error: \n', err);
  }

  const defaultParams = {screen_name: req.body.data};
  console.log('user: \n', defaultParams);
  //start call
  T.get("friends/ids", defaultParams, async (error, data) => {
    res.send(data.ids);
  });
});

app.post('/ttapi/getFriendIDs2', async (req, res) => {
  console.log('Route accessed: /ttapi/getFriendIDs2');
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
    console.log('Twit Object Error: \n', err);
  }

  let defaultParams;
  if (req.body.cursor === 1) {
    defaultParams = {screen_name: req.body.screenname};
  } else {
    defaultParams = {screen_name: req.body.screenname, cursor: req.body.cursor};
  }
  // const defaultParams = {screen_name: req.body.screenname, cursor: req.body.cursor};
  console.log('user: \n', defaultParams);
  //start call
  T.get("friends/ids", defaultParams, async (error, data) => {
    res.send({ids: data.ids, cursor: data.next_cursor});
  });
});

app.post('/ttapi/getFollowerIDs', async (req, res) => {
  console.log('Route accessed: /ttapi/getFollowerIDs');
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
    console.log('Twit Object Error: \n', err);
  }

  const defaultParams = {screen_name: req.body.data};
  console.log('user: \n', defaultParams);
  //start call
  T.get("followers/ids", defaultParams, async (error, data) => {
    res.send(data.ids);
  });
});

app.post('/ttapi/getFollowerIDs2', async (req, res) => {
  console.log('Route accessed: /ttapi/getFollowerIDs2');
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
    console.log('Twit Object Error: \n', err);
  }

  let defaultParams;
  if (req.body.cursor === 1) {
    defaultParams = {screen_name: req.body.screenname};
  } else {
    defaultParams = {screen_name: req.body.screenname, cursor: req.body.cursor};
  }
  // const defaultParams = {screen_name: req.body.data, cursor: req.body.cursor};
  console.log('user: \n', defaultParams);
  //start call
  T.get("followers/ids", defaultParams, async (error, data) => {
    res.send({ids: data.ids, cursor: data.next_cursor});
  });
});

app.post('/ttapi/getUserNames', async (req, res) => {
  console.log('Route accessed: /ttapi/getUserNames');
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
    console.log('Twit Object Error: \n', err);
  }

  console.log('Userlist Returns Data?: \n', (req.body.data.length > 0 ? true : false));
  //start call
  T.get("users/lookup", {user_id: req.body.data}, async (error, data) => {
    res.send(data);
  });
});

app.post('/ttapi/getUserData', async (req, res) => {
  console.log('Route accessed: /ttapi/getUserData');
  console.log(req.body.data);
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
    console.log('Twit Object Error: \n', err);
  }

  console.log('Userlist Returns Data?: \n', (req.body.data.length > 0 ? true : false));
  //start call
  T.get("users/lookup", {screen_name: req.body.data}, async (error, data) => {
    res.send(data);
  });
});

app.post('/ttapi/getUserTweets', async (req, res) => {
  console.log('Route accessed: /ttapi/getUserTweets');
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
    console.log('Twit Object Error: \n', err);
  }
  const defaultParams = req.body
  console.log("server params", defaultParams);
  //start call
  T.get("statuses/user_timeline", defaultParams, async (error, data) => {
    console.log("tweet data", data)
    res.send(data);
  });
});

// The "catchall" handler: for any request that don't
// match any above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port);

console.log(`App listening on ${port}`);
