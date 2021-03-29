import React, { Component } from "react";
import axios from "axios";
import Papa from "papaparse";
import * as wbExports from './wbExports';

const Timeout = require("await-timeout");

const createTweetObj = (tweet) => {
  return {
    "CREATED_AT": tweet.created_at.substring(0, 19),
    "YEAR": tweet.created_at.substring(26, 30),
    "ID": tweet.id_str,
    "TEXT": tweet.full_text,
    "IS REPLY?": tweet.in_reply_to_status_id
      ? tweet.in_reply_to_status_id
      : false,
    "IS RETWEET?": tweet.retweeted_status ? true : false,
    "IS QUOTE TWEET?": tweet.quoted_status_id
      ? tweet.quoted_status_id
      : false,
    "QUOTE COUNT": tweet.quote_count,
    "RETWEET COUNT": tweet.retweet_count,
    "FAVORITE COUNT": tweet.favorite_count,
    "TWEET URL": tweet.entities.urls[0]
      ? tweet.entities.urls[0].url
      : false,
    "QUOTE TWEET URL": tweet.quoted_status_permalink
      ? tweet.quoted_status_permalink.url
      : "NONE",
    "SOURCE": tweet.source.substring(
      tweet.source.indexOf(">") + 1,
      tweet.source.lastIndexOf("<")
    )
  }
};
  // get tweet history of a user
  export const processTweetHistory = async (store, actions) => {
    let promiseArray = [];
    let i = 1;
    let defaultParams = {
      screen_name: store.userHandle,
      tweet_mode: "extended",
      count: 200,
      include_rts: "true",
    };
    console.log("Parameters sent to Twitter API", defaultParams);

    do {
      try {
        const timer = new Timeout();
        const C = await timer.set(2000).then(async () => {
          const A = await axios.post("/ttapi/getUserTweets", defaultParams);
          const B = A.data.map((tweet) => {
            const tweetObj = createTweetObj(tweet);
            return tweetObj;
          });
          actions.setMessage("Found " + (i-1+200).toString() + " tweets out of 3200")
          actions.setProgress(Math.floor((String(i - 1) / 3200) * 100).toString() + "%");

          // update max_id parameter to paginate
          const max_id = String(B[B.length - 1].ID - 1);
          defaultParams = {
            screen_name: store.userHandle,
            tweet_mode: "extended",
            count: 200,
            include_rts: "true",
            max_id: max_id,
          };
          return B;
        });
        promiseArray.push(C);
      } catch (e) {
        console.log(e);
      }
      i += 200;
    } while (i < 3200);

    await Promise.all(promiseArray)
    .then(result => {
      // extract values into a single array
      let tweetHist = [];
      result.forEach(array => 
        array.forEach(user => 
          tweetHist.push(user)
        )
      );
      return tweetHist
    })
    .then(data => 
      // export results to an xlsx file
      wbExports.outputWbTweetHistory(store.outputFileName, data)
    )
    .catch(err =>
      console.log(err)
    )
  };

  // get the mutual followings or friends of a group of people based on an uploaded list of names
  export const processMutualNetworkFile = async (store, actions) => {
    try {
      await Papa.parse(store.fileUpload, {
        complete: async (results) => {
          
          // concat all arrays (look for concat alternative)
          let usernames = [];
          results.data.forEach((array) => {
            array.forEach((user) => {
              usernames.push(user);
            });
          });

          console.log("Number of usernames read from file: ", usernames.length);

          // retrieve network for users
          let user_ids;
          console.log("Retrieving friend/follower IDs for input list of users ...");
          user_ids = await this.getNetworkIDs(usernames, store.search, store.sampling, actions);

          // start obtaining mutual counts for network
          const [ output_count, output_users ] = await mutualNetworkCount(user_ids);
          console.log(output_users.length > 0 ? true : false);    
             
          await finalize(output_count, output_users)
          .then(result =>
              result.length > 0 ? wbExports.outputWbMutualNetwork(result) : null
          )
          .catch(err => console.log("Error: ", err))
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  // get the mutual followings or friends of a group of people based on a single user handle
  export const processMutualNetworkUser = async (store, actions) => {
    try {

      let user_ids;
      let searchUrl = store.search === "friends" ? "/ttapi/getFriendIDs" : "/ttapi/getFollowerIDs"

      console.log("Retrieving friends " + store.search + " IDs of user");
      user_ids = await axios.post(searchUrl, {
        data: store.userHandle,
      })
      .then(results => {
        if (results.data.length > 0) {
          return results.data
        } else {
          console.log("no data retrieved")
        }
      })

      console.log("Retrieving screen names from list of IDs ...");
      let usernames = await this.getUserNames(initData);
      
      console.log("Retrieving friend/follower IDs for input list of users ...");
      user_ids = await this.getNetworkIDs(usernames, store.search, store.sampling, actions);

      const [output_count, output_users] = await this.mutualIds(user_ids);
      console.log(output_users.length > 0 ? true : false); 

      await finalize(output_count, output_users)
      .then(result =>
          result.length > 0 ? wbExports.outputWbMutualNetwork(result) : null
      )
      .catch(err => console.log("Error: ", err))
    } catch (err) {
      console.log(err);
    }
  };
  // get the friends or followers of a single user handle
  export const processNetwork = async (store, actions) => {
    try {
      let user_ids;
      console.log("Retrieving friend/follower IDs for input list of users ...");
      user_ids = await this.getNetworkIdsPage(usernames, store.search, actions);

      let usernames = await this.getUserNames(userids);
      await finalize2(usernames)
      .then(result =>
          result.length > 0 ? wbExports.outputWbNetwork(result) : null
      )
      .catch(err => console.log("Error: ", err))
    } catch (err) {
      console.log(err);
    }
  };
 
  // export const getUserTweets = async () => {
  // };

  export const getUserNames = async (userids) => {
    let promiseArray = [];
    let i = 0;

    do {
      try {
        const timer = new Timeout();
        const start_time = Date.now();
        const C = await timer.set(3100).then(async () => {
          const A = await axios.post("/ttapi/getUserNames", {
            data: userids.slice(i, i + 100),
          });
          const B = A.data.map((user) => user.screen_name);
          var end_time = Date.now() - start_time;
          console.log(
            "Elapsed time: ",
            Math.floor(end_time / 1000),
            " seconds \n processed users: ",
            String(i),
            " - ",
            String(i + 100)
          );
          return B;
        });
        promiseArray.push(C);
      } catch (e) {
        console.log(e);
      }
      i += 100;
    } while (i < userids.length);

    let usernames = [];
    await Promise.all(promiseArray)
    .then(result => {
      result.forEach((array) => 
        array.forEach((user) => 
          usernames.push(user)
        )
      );
    })
    
    return usernames;
  };

  export const getNetworkIds = async (usernames, searchType, samplingType, actions) => {
    let promiseArray = [];
    let sampleArray = [];
    let i = 0;
    let newVal = 0;
    let limit = 0;
    
    let searchUrl = searchType === "followers" ? "/ttapi/getFollowerIDs" : "/ttapi/getFriendIDs"

    if (usernames.length <= 500) {
      limit = usernames.length;
      for (var j = 0; j < limit; j++) {
        listArray.push(j);
      }
    } else {
      limit = 500;
      if (samplingType === "reverse") {
        do {
          sampleArray.push(newVal);
          newVal += 1;
        } while (sampleArray.length < limit);
      } else if (samplingType === "random") {
        do {
          const newVal = Math.floor(Math.random() * usernames.length);
          if (!sampleArray.includes(newVal)) {
            sampleArray.push(newVal);
          }
        } while (sampleArray.length < limit);
      } else {
        do {
          sampleArray.push(usernames.length - newVal);
          newVal += 1;
        } while (sampleArray.length < limit);
      }
    }

    do {
      try {
        const timer = new Timeout();
        const B = await timer.set(61000).then(async () => {
          const A = await axios.post(searchUrl, {
            data: usernames[sampleArray[i]],
          });
          actions.setMessage("Processed user " + (i + 1).toString() + " out of " + usernames.length + " ...")
          actions.setProgress(Math.floor(((i + 1).toString() / usernames.length) * 100).toString() + "%")
          console.log("Found information for user: ", usernames[sampleArray[i]]);
          return A.data;
        });
        promiseArray.push(B);
      } catch (e) {
        console.log(e);
      }
      i += 1;
    } while (i < limit); //userNamesList1.length)

    let user_ids = [];
    await Promise.all(promiseArray)
    .then(result => {
      result.forEach(array => {
        if (array.length > 0) {
          const temp = array.filter(user => user !== undefined);
          user_ids.concat(temp);
        }
      })
    });

    return user_ids;
  };

  export const getNetworkIdsPage = async (username, searchType, actions) => {
    let promiseArray = [];
    let i = 0;
    let cursor = 1;

    let searchUrl = searchType === "followers" ? "/ttapi/getFollowerIDs2" : "/ttapi/getFriendIDs2"

    do {
      try {
        const timer = new Timeout();
        console.log("current cursor: ", cursor);
        const B = await timer.set(61000).then(async () => {
          const A = await axios.post(searchUrl, {
            screenname: username,
            cursor: cursor,
          });
          cursor = A.data.cursor;
          console.log("new cursor value:", cursor);
          console.log("new counter value:", i);
          actions.setMessage("Retrieved " +
          String(i * 5000 + A.data.ids.length) +
          " out of 50,000 max " + searchType)
          actions.setProgress(Math.floor((String(i + 1) / 10) * 100).toString() + "%")
          return A.data.ids;
        });
        promiseArray.push(B);
      } catch (e) {
        console.log(e);
      }
      i += 1;
    } while (i < 10 && cursor !== 0); //userNamesList1.length)

    let userids = [];
    await Promise.all(promiseArray)
    .then(result => 
      result.forEach(array => {
        if (array.length > 0) {
          const temp = array.filter(user => user !== undefined)
          userids.concat(temp)
        }
      })
    )

    return userids;
  };

  export const mutualNetworkCount = async (userids) => {
    const outputCount = {};
    userids.forEach((array) => {
      array.forEach((user) => {
        if (outputCount[user]) {
          outputCount[user] += 1;
        } else {
          outputCount[user] = 1;
        }
      });
    });

    let arr = [];
    for (let key in outputCount) {
      if (outputCount.hasOwnProperty(key)) {
        arr.push([key, outputCount[key]]);
      }
    }

    arr = arr.sort(function (a, b) {
      return a[1] - b[1]; // compare numbers
    });

    const newObj = {};
    for (var i = arr.length - 1001; i < arr.length; i++) {
      var akey = arr[i][0];
      var value = arr[i][1];
      newObj[akey] = value;
    }

    console.log("newobj length: ", Object.keys(newObj).length);

    const outputUsers = Object.keys(newObj);
    return [newObj, outputUsers];
  };

  export const finalize = async (userCount, userids) => {
    console.log("finalize 1")
    var promiseArray = [];
    var i = 0;

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const C = await timer.set(3100).then(async () => {
          const A = await axios.post("/ttapi/getUserNames", {
            data: userids.slice(i, i + 100),
          });
          const B = A.data.map((user) => {
            const userObj = {
              USER_ID: user.id,
              USER_NAME: user.name,
              SCREEN_NAME: user.screen_name,
              FOLLOWER_COUNT: user.followers_count,
              DESCRIPTION: user.description,
              LOCATION: user.location,
              VERIFIED: user.verified,
              DATE_JOINED: user.created_at,
              YEAR_JOINED: user.created_at.substring(26, 30),
            };
            return userObj;
          });
          var end = Date.now() - start;
          console.log(
            "Elapsed time: ",
            Math.floor(end / 1000),
            " seconds \n processed users: ",
            String(i),
            " - ",
            String(i + 100)
          );
          return B;
        });
        promiseArray.push(C);
      } catch (e) {
        console.log(e);
      }
      i += 100;
    } while (i < userids.length);

    const result = await Promise.all(promiseArray);
    const usernames = [];
    result.forEach((array) => array.forEach((user) => usernames.push(user)));

    usernames.forEach((obj) => {
      const objID = String(obj.USER_ID);
      obj.MUTUAL_COUNT = userCount[objID];
    });

    return usernames;
  };

  export const finalize2 = async (usernames) => {
    console.log("finalize 2")
    console.log(usernames)
    var promiseArray = [];
    var i = 0;

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const C = await timer.set(3100).then(async () => {
          const A = await axios.post("/ttapi/getUserData", {
            data: usernames.slice(i, i + 100),
          });
          const B = A.data.map((user) => {
            const userObj = {
              USER_ID: user.id,
              USER_NAME: user.name,
              SCREEN_NAME: user.screen_name,
              FOLLOWER_COUNT: user.followers_count,
              DESCRIPTION: user.description,
              LOCATION: user.location,
              VERIFIED: user.verified,
              DATE_JOINED: user.created_at,
              YEAR_JOINED: user.created_at.substring(26, 30),
            };
            return userObj;
          });
          var end = Date.now() - start;
          console.log(
            "Elapsed time: ",
            Math.floor(end / 1000),
            " seconds \n processed users: ",
            String(i),
            " - ",
            String(i + 100)
          );
          return B;
        });
        promiseArray.push(C);
      } catch (e) {
        console.log(e);
      }
      i += 100;
    } while (i < usernames.length);

    const result = await Promise.all(promiseArray);
    const usernames2 = [];
    result.forEach((array) => array.forEach((user) => usernames2.push(user)));

    // filter username2 by VERIFIED
    // sort username2 by FOLLOWER_COUNT

    return usernames2;
  };

// work on these functions for new products to the app

export const networkFile = (props) => {
  return (
    <div className="row z-depth-5 fileupload-func-panel">
      <h6 className="bold">FILE-PARSER</h6>
      <form id="userList" onSubmit={props.handleSubmit}>
        <div className="file-field input-field">
          <div
            className={
              "btn " + (props.disableButton ? "disabled" : "grey darken-2")
            }
          >
            <span>
              UPLOAD
              <i className="material-icons right" style={{ margin: "0px" }}>
                file_upload
              </i>
            </span>
            <input
              type="file"
              name="file"
              id="fileUpload"
              onChange={props.handleChange}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <button
          className={
            "btn " +
            (props.disableButton
              ? "disabled"
              : "grey darken-2 waves-effect waves-light")
          }
          type="submit"
          name="action"
        >
          Process
        </button>
      </form>
      <br />

      <div
        className=""
        style={{
          marginTop: "10px",
          display: props.loading === "file-parser" ? "block" : "none",
        }}
      >
        <p>users read from file: {props.fileUsers}</p>
        <p>{props.parseFriend}</p>
        <p>{props.aggregateListLength}</p>
        <ProgressBar
          loading={props.loading}
          progress={props.progressBar}
        />
        <p>{props.wrapUp}</p>
      </div>
    </div>
  );
};

export const getNetworkFile = async () => {
  try {
    await Papa.parse(this.state.fileUpload, {
      complete: async (results) => {
        this.setState({
          loading: "file-parser",
          disableButton: true,
          outputFileName: "File_Parser",
        });

        console.log("initializing file-parser...");
        var usernames = [];

        results.data.forEach((array) => {
          array.forEach((user) => {
            usernames.push(user);
          });
        });

        this.setState({
          userListLength: "Users read on file: " + String(usernames.length),
        });
        console.log("Number of usernames retrieved: ", usernames.length);
        this.setState({ userListLength: String(usernames.length) });

        this.setState({
          wrapUp:
            "processing, please wait approximately: " +
            Math.floor((usernames.length * 3) / 60) +
            " minutes",
        });

        results = await this.finalize2(usernames);
        console.log(
          "finalized data exists?: ",
          results.length > 0 ? true : false
        );

        this.outputWorkbook(results);

        this.resetState();
      },
    });
  } catch (err) {
    console.log(err);
    this.setState({ errorMsg: err.message });
  }
};