// PACKAGES
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Twit = require('twit');
const XLSX = require('xlsx');

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
  if (req.body.userName == '123' && req.body.passWord == '123') {
    console.log('client login successful');
    res.send({confirmation: true, error: false});
  }
	else {
    console.log('client login failed');
		res.send({confirmation: false, error: true});
	}
});

// PROGRAM INITIALIZATION
app.post('/ttapi/fileparse', async (req, res) => {
  console.log('Route accessed: /ttapi/fileparse');
  // console.log('incoming data \n', req.body);

  let T;

  try {
    T = new Twit({
      consumer_key: process.env.consumer_key,
      consumer_secret: process.env.consumer_secret,
      app_only_auth: true
      // timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    });
    console.log('Twit Object: \n', T);
  } catch (err) {
    console.log('Twit Object error: \n', err);
  }

  try {
    var dataArray = [];
    var i;
    var c=0;

    console.log("retrieving data...");

    T.get('friends/list', { screen_name: 'tolga_tezel', count: 5},  function getData(err, data, response) {

      for (i = 0; i<data.users.length; i++) {
        // console.log("page: ", c, "\n", "user: ", i);
        dataArray.push({
          "USER_ID": data.users[i].id,
          "USER_NAME": data.users[i].name,
          "SCREEN_NAME": data.users[i].screen_name,
          "FOLLOWER_COUNT": data.users[i].followers_count,
          "LOCATION": data.users[i].location,
          "VERIFIED": data.users[i].verified,
          "DATE_JOINED": data.users[i].created_at
        });
      }

      c +=1

      if (c<4) {
        T.get('friends/list', { screen_name: 'tolga_tezel', count: 5, cursor: data['next_cursor'] }, getData);
      } else {
        console.log("data collection completed: ", dataArray.length);
        console.log(dataArray);
        res.send(dataArray);
      }
    });
  } catch(err) {
    console.log("data collection error: ", err);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}`);
