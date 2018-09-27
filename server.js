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
  console.log('Route accessed: /ttapi/userparse');
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

  console.log('data: \n', req.body.data);
  //start call
  twitData(req.body.data);

  async function twitData(inputData) {
    //get initial list of friend ids and map their usernames
    console.log(inputData)

    var userNamesList1 = [];
    var promises = [];
    var i = 0;
    var j = 0;

    inputData.forEach(array => {
      array.forEach(user => {
        userNamesList1.push(user);
      });
    });

    console.log("userNamesList1: ", userNamesList1);

    const userIdsAoAPromise = userNamesList1.map(async (name, i) => {
      const params = {screen_name: name};
      try {
        const timer = new Timeout();
        const userIdList = await timer.set(i*60000+2000)
          .then(async () => {
            const friendsList = await T.get("friends/ids", params)
            return friendsList.data.ids
          });
        return userIdList
      } catch(e) {
        // console.log('ERROR')
      }
    });

    const userIdsAoAUnfiltered = await Promise.all(userIdsAoAPromise);
    const userIdsAoA = [];
    userIdsAoAUnfiltered.forEach(array => {
      var temp = array.filter(user => user !=undefined);
      userIdsAoA.push(temp);
    });

    console.log("user ids: ", userIdsAoA.length);

    const outputCount = {}
    userIdsAoA.forEach(array => {
      array.forEach(user => {
        if (outputCount[user]) {
          outputCount[user] += 1;
        } else {
          outputCount[user] = 1;
        }
      })
    });
    //
    const outputUsers = Object.keys(outputCount);
    console.log("outputUsers length: ", outputUsers.length);

    promises2 = []
    var i=0
    var j=0

    do {
      const params = {user_id: outputUsers.slice(i,i+100)}
      try {
        const timer = new Timeout();
        const C = await timer.set(j*300+50)
          .then(async () => {
            const A = await T.get("users/lookup", params)
            const B = A.data.map(user => {
              const userObj = {
                "USER_ID": user.id,
                "USER_NAME": user.name,
                "SCREEN_NAME": user.screen_name,
                "FOLLOWER_COUNT": user.followers_count,
                "LOCATION": user.location,
                "VERIFIED": user.verified,
                "DATE_JOINED": user.created_at
              }
              // console.log(userObj)
              return userObj
            })
            return B
          });
        promises2.push(C);
      } catch(e) {
        // console.log('ERROR')
      }
      i+=100
      j+=1
    } while (i<outputUsers.length)

    const promiseResult2 = await Promise.all(promises2);
    const userNamesList2 = [];
    promiseResult2.forEach(array =>
      array.forEach(user =>
        userNamesList2.push(user)
      )
    );

    userNamesList2.forEach(obj => {
      const objID = String(obj.USER_ID)
      obj.MUTUAL_COUNT = outputCount[objID];
      obj.MUTUAL_PERCENT_COUNT = Math.round((outputCount[objID]/outputUsers.length)*100)/100;
    });

    console.log("userNamesList2 length: ", userNamesList2);
    res.send(userNamesList2);
  }
});

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
    console.log('Twit Object: \n', T);
  } catch (err) {
    console.log('Twit Object error: \n', err);
  }

  const defaultParams = {screen_name: req.body.data};
  console.log('user: \n', defaultParams);
  //start call
  T.get("friends/ids", defaultParams, async (error, data) => {
    //get initial list of friend ids and map their usernames
    // var promises = [];
    // var i = 0;
    // var j = 0;
    //
    // do {
    //   const params = {user_id: data.ids.slice(i,i+100)}
    //   try {
    //     const timer = new Timeout();
    //     const C = await timer.set(j*300+50)
    //       .then(async () => {
    //         const A = await T.get("users/lookup", params)
    //         const B = A.data.map(user => user.screen_name)
    //         return B
    //       });
    //     promises.push(C);
    //   } catch(e) {
    //     // console.log('ERROR')
    //   }
    //   i+=100
    //   j+=1
    // } while (i<data.ids.length)
    //
    // const promiseResult = await Promise.all(promises);
    // const userNamesList1 = [];
    // promiseResult.forEach(array =>
    //   array.forEach(user =>
    //     userNamesList1.push(user)
    //   )
    // );
    //
    // console.log("userNamesList1 length: ", userNamesList1.length);
    //
    // const userIdsAoAPromise = userNamesList1.slice(0,2).map(async (name, i) => {
    //   const params = {screen_name: name};
    //   try {
    //     const timer = new Timeout();
    //     const userIdList = await timer.set(i*60000+2000)
    //       .then(async () => {
    //         const friendsList = await T.get("friends/ids", params)
    //         return friendsList.data.ids
    //       });
    //       return userIdList
    //       // return username.data.screen_name;
    //   } catch(e) {
    //     // console.log('ERROR')
    //   }
    // });
    //
    // const userIdsAoAUnfiltered = await Promise.all(userIdsAoAPromise);
    // const userIdsAoA = [];
    // userIdsAoAUnfiltered.forEach(array => {
    //   var temp = array.filter(user => user !=undefined);
    //   userIdsAoA.push(temp);
    // });
    //
    // const outputCount = {}
    // userIdsAoA.forEach(array => {
    //   array.forEach(user => {
    //     if (outputCount[user]) {
    //       outputCount[user] += 1;
    //     } else {
    //       outputCount[user] = 1;
    //     }
    //   })
    // });
    //
    // const outputUsers = Object.keys(outputCount);
    // console.log("outputUsers length: ", outputUsers.length);
    //
    // promises2 = []
    // var i=0
    // var j=0
    // do {
    //   const params = {user_id: outputUsers.slice(i,i+100)}
    //   try {
    //     const timer = new Timeout();
    //     const C = await timer.set(j*300+50)
    //       .then(async () => {
    //         const A = await T.get("users/lookup", params)
    //         const B = A.data.map(user => {
    //           const userObj = {
    //             "USER_ID": user.id,
    //             "USER_NAME": user.name,
    //             "SCREEN_NAME": user.screen_name,
    //             "FOLLOWER_COUNT": user.followers_count,
    //             "LOCATION": user.location,
    //             "VERIFIED": user.verified,
    //             "DATE_JOINED": user.created_at
    //           }
    //           // console.log(userObj)
    //           return userObj
    //         })
    //         return B
    //       });
    //     promises2.push(C);
    //   } catch(e) {
    //     // console.log('ERROR')
    //   }
    //   i+=100
    //   j+=1
    // } while (i<outputUsers.length)
    //
    // const promiseResult2 = await Promise.all(promises2);
    // const userNamesList2 = [];
    // promiseResult2.forEach(array =>
    //   array.forEach(user =>
    //     userNamesList2.push(user)
    //   )
    // );
    //
    // userNamesList2.forEach(obj => {
    //   const objID = String(obj.USER_ID)
    //   obj.MUTUAL_COUNT = outputCount[objID];
    //   obj.MUTUAL_PERCENT_COUNT = Math.round((outputCount[objID]/outputUsers.length)*100)/100;
    // });
    //
    // console.log("userNamesList2 length: ", userNamesList2.length);
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
    console.log('Twit Object: \n', T);
  } catch (err) {
    console.log('Twit Object error: \n', err);
  }

  console.log('userlist: \n', req.body.data);
  //start call
  T.get("users/lookup", {user_id: req.body.data}, async (error, data) => {
    res.send(data);
    // res.send("userparse2 complete");
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
