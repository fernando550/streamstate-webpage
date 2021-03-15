// PACKAGES
// require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const Timeout = require("await-timeout");
var Twitter = require("twitter");

// START EXPRESS APP ROUTING
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVE STATIC FILES FROM REACT
app.use(express.static(path.join(__dirname, "client/build")));

// LOGIN REQUEST
app.post("/ttapi/login", async (req, res) => {
  console.log("Entered credentials for client login request: ", req.body);
  if (
    req.body.username == process.env.user &&
    req.body.password == process.env.passcode
  ) {
    console.log("client login successful");
    res.send({ confirmation: true, error: false });
  } else {
    console.log("client login failed");
    res.send({ confirmation: false, error: true });
  }
});

// middleware to create instance of twitter client
app.use((req, res, next) => {
  try {
    req.twitterClient = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      bearer_token: process.env.BEARER_TOKEN
    });
    next();
  } catch (error) {
    console.log("twitterClient Error: ", error);
  }
});

// PROGRAM INITIALIZATION
app.post("/ttapi/getFriendIDs", async (req, res) => {
  console.log("Route accessed: /ttapi/getFriendIDs");
  const defaultParams = { screen_name: req.body.data };
  console.log("user: \n", defaultParams);
  //start call
  req.twitterClient.get("friends/ids", defaultParams, async (error, data) => {
    res.send(data.ids);
  });
});

app.post("/ttapi/getFriendIDs2", async (req, res) => {
  console.log("Route accessed: /ttapi/getFriendIDs2");
  let defaultParams;
  if (req.body.cursor === 1) {
    defaultParams = { screen_name: req.body.screenname };
  } else {
    defaultParams = {
      screen_name: req.body.screenname,
      cursor: req.body.cursor,
    };
  }
  // const defaultParams = {screen_name: req.body.screenname, cursor: req.body.cursor};
  console.log("user: \n", defaultParams);
  //start call
  console.log(req.twitterClient)
  req.twitterClient.get("friends/ids", defaultParams, async (error, data) => {
    res.send({ ids: data.ids, cursor: data.next_cursor });
  });
});

app.post("/ttapi/getFollowerIDs", async (req, res) => {
  console.log("Route accessed: /ttapi/getFollowerIDs");
  const defaultParams = { screen_name: req.body.data };
  console.log("user: \n", defaultParams);
  //start call
  req.twitterClient.get("followers/ids", defaultParams, async (error, data) => {
    res.send(data.ids);
  });
});

app.post("/ttapi/getFollowerIDs2", async (req, res) => {
  console.log("Route accessed: /ttapi/getFollowerIDs2");
  let defaultParams;
  if (req.body.cursor === 1) {
    defaultParams = { screen_name: req.body.screenname };
  } else {
    defaultParams = {
      screen_name: req.body.screenname,
      cursor: req.body.cursor,
    };
  }
  // const defaultParams = {screen_name: req.body.data, cursor: req.body.cursor};
  console.log("user: \n", defaultParams);
  //start call
  req.twitterClient.get("followers/ids", defaultParams, async (error, data) => {
    res.send({ ids: data.ids, cursor: data.next_cursor });
  });
});


app.post("/ttapi/getUserNames", async (req, res) => {
  console.log("Route accessed: /ttapi/getUserNames");
  console.log(
    "Userlist Returns Data?: \n",
    req.body.data.length > 0 ? true : false
  );

  let ids = req.body.data
  let idsString = "";
  ids.forEach((item, index) => {
    index < 1 ? idsString += item : idsString += "," + item
  })

  console.log(idsString)
  //start call
  req.twitterClient.get("users/lookup", { user_id: idsString }, async (error, data) => {
    console.log(data)
    res.send(data);
  });
});

app.post("/ttapi/getUserData", async (req, res) => {
  console.log("Route accessed: /ttapi/getUserData");
  console.log(
    "Userlist Returns Data?: \n",
    req.body.data.length > 0 ? true : false
  );

  let ids = req.body.data
  let idsString = "";
  ids.forEach((item, index) => {
    index < 1 ? idsString += item : idsString += "," + item
  })

  //start call
  req.twitterClient.get("users/lookup", { screen_name: idsString }, async (error, data) => {
    res.send(data);
  });
});

app.post("/ttapi/getUserTweets", async (req, res) => {
  console.log("Route accessed: /ttapi/getUserTweets");
  var params = req.body
  req.twitterClient.get(
    "statuses/user_timeline",
    params,
    (error, tweets, response) => {
      if (!error) {
        // console.log(tweets);
        console.log("successful");
      }
      res.send(JSON.stringify(tweets));
    }
  );
});

// The "catchall" handler: for any request that don't
// match any above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port);

console.log(`App listening on ${port}`);
