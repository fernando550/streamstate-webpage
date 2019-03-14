import React, {Component} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import XLSX from 'xlsx';
const Timeout = require('await-timeout');

class FileUpload extends Component {

  // Initialize state
  state = {
    errorMsg: '',
    loading: false,
    serverData: null,
    fileUpload: null,
    userName: null,
    disableButton: false,
    parseFriend: 'initializing, please wait...',
    userListLength: '...',
    aggregateListLength: '',
    wrapUp: '',
    sampling: 'reverse',
    parserType: 'friends',
    outputFileName: ''
  }

  onChange = (e) => {
    e.preventDefault();
    if (e.target.id === 'fileUpload') {
      this.setState({fileUpload:e.target.files[0]})
    } else {
      this.setState({userName: e.target.value});
    }
  }

  onChangeSample = async (e) => {
    e.preventDefault();
    if(e.target.id === 'chrono') {
      this.setState({sampling: 'chrono'})
    } else if (e.target.id === 'random') {
      this.setState({sampling: 'random'})
    } else if (e.target.id === 'reverse'){
      this.setState({sampling: 'reverse'})
    }
  }

  onChangeParser = async (e) => {
    e.preventDefault();
    if(e.target.id === 'friends') {
      this.setState({parserType: 'friends'})
    } else if (e.target.id === 'followers') {
      this.setState({parserType: 'followers'})
    }
  }

  handleSubmit = async (e) => {
  	e.preventDefault();
    e.persist();

    if (e.target.id === "fileForm") {
      console.log("fileForm Pressed!")
      await this.processFile();
    }

    if (e.target.id === "userForm") {
      console.log("userForm Pressed!")
      await this.processUser();
    }

    if (e.target.id === "tweetForm") {
      console.log("tweetForm Pressed!")
      await this.processTweetHist();
    }
    //elseif tweet or followers input
  }

  outputWorkbook = (data) => {
    var ws_name = this.state.outputFileName
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(
      data,
      {
        skipHeader: false,
        origin: "A1",
        header:[
          "USER_ID",
          "USER_NAME",
          "SCREEN_NAME",
          "FOLLOWER_COUNT",
          "DESCRIPTION",
          "LOCATION",
          "VERIFIED",
          "DATE_JOINED",
          "MUTUAL_COUNT"
          // ,
          // "MUTUAL_PERCENT_COUNT"
        ]
      }
    );

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, 'twitter-data.xlsb');
  }

  outputTwitBook = (data) => {
    var ws_name = this.state.outputFileName
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(
      data,
      {
        skipHeader: false,
        origin: "A1",
        header:[
          "CREATED_AT",
          "ID",
          "TEXT",
          "REPLY TO STATUS",
          "RETWEET?",
          "RETWEET_COUNT",
          "FAVORITE_COUNT",
          "REPLY_COUNT",
          "URL",
          "RETWEETED...?",
          "FAVORITED...?"
        ]
      }
    );

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, 'twitter-data.xlsb');
  }

  resetState = function () {
    this.setState({
      errorMsg: '',
      loading: false,
      serverData: null,
      fileUpload: null,
      userName: null,
      disableButton: false,
      parseFriend: 'initializing, please wait...',
      userListLength: '...',
      aggregateListLength: '',
      wrapUp: '',
      sampling: 'reverse',
      parserType: 'friends',
      outputFileName: ''
    });
  }

  processTweetHist = async () => {
    try{
      this.setState({
        loading: 'tweet-parser',
        disableButton: true,
        outputFileName: 'Tweet_Hist_'+ this.state.userName
      });

      console.log("initializing tweet-parser...")
      let results = await this.getUserTweets(this.state.userName);
      console.log("Number of tweets found: ", results.length)

      console.log("Finishing up...")
      this.outputTwitBook(results);

      this.resetState();
    } catch(err) {
      console.log(err);
    }
  }

  processFile = async () => {
    try{
      await Papa.parse(this.state.fileUpload, {
      	complete: async (results) => {
          this.setState({
            loading: 'list-parser',
            disableButton: true,
            outputFileName: 'File_Parser'
          });

          console.log("initializing file-parser...")
          var usernames = [];

          results.data.forEach(array => {
            array.forEach(user => {
              usernames.push(user);
            });
          });

          this.setState({userListLength: "Users read on file: " + String(usernames.length)})
          console.log("Number of usernames retrieved: ", usernames.length)
          this.setState({userListLength: String(usernames.length)})

          let userids;

          if (this.state.parserType === "friends") {
            console.log("Retrieving friend IDs for input list of users ...")
            userids = await this.getFriendIDs(usernames)
          } else {
            console.log("Retrieving follower IDs for input list of users ...")
            userids = await this.getFollowerIDs(usernames)
          }

          console.log("aggregating list of mutual ", this.state.parserType, " by IDs");
          var outputCount, outputUsers;
          [outputCount, outputUsers] = await this.mutualIds(userids)

          this.setState({aggregateListLength: "number of mutual " + this.state.parserType + ": " + outputUsers.length})
          console.log("aggregated list not empty?: ", (outputUsers.length > 0 ? true : false), "\n list length: ", outputUsers.length);
          console.log("Retrieving user data from IDs list of mutual " + this.state.parserType + " ...")
          this.setState({wrapUp: "wrapping up, please wait approximately: " + Math.floor(outputUsers.length/2000) + " minutes "});

          results = await this.finalize(outputCount, outputUsers)
          console.log("finalized data exists?: ", (results.length > 0 ? true : false));

          this.outputWorkbook(results);

          this.resetState();
        }
      });
    } catch(err) {
      console.log(err);
      this.setState({errorMsg: err.message});
    }
  }

  processUser = async () => {
    try{
      this.setState({
        loading: 'user-parser',
        disableButton: true,
        outputFileName: 'User_Parser_' + this.state.userName
      });

      let initData;
      let initResponse
      console.log("initializing user-parser...")
      if (this.state.parserType === "friends") {
        console.log('entered friends parsing for single user parser')
        initResponse = await axios.post('/ttapi/getFriendIDs', {data: this.state.userName});
        initData = initResponse.data;
        if (initData.length >0) {console.log("data collected")}
      } else {
        console.log('entered followers parsing for single user parser')
        initResponse = await axios.post('/ttapi/getFollowerIDs', {data: this.state.userName});
        initData = initResponse.data;
        if (initData.length >0) {console.log("data collected")}
      }

      console.log("Number of ", this.state.parserType, " IDs retrieved: ", initData.length)
      console.log("Retrieving screen names from list of IDs ...")
      var usernames = await this.getUserNames(initData)

      console.log("Retrieved user names for: ", usernames.length, " out of ", initData.length, " user IDs");
      this.setState({userListLength: String(usernames.length)})

      let userids;

      if (this.state.parserType === "friends") {
        console.log("Retrieving friend IDs for input list of users ...")
        userids = await this.getFriendIDs(usernames)
      } else {
        console.log("Retrieving follower IDs for input list of users ...")
        userids = await this.getFollowerIDs(usernames)
      }

      console.log("aggregating list of mutual ", this.state.parserType, " by IDs");
      var outputCount, outputUsers;
      [outputCount, outputUsers] = await this.mutualIds(userids)

      this.setState({aggregateListLength: "number of mutual " + this.state.parserType + ": " + outputUsers.length})
      console.log("aggregated list not empty?: ", (outputUsers.length > 0 ? true : false), "\n list length: ", outputUsers.length);
      console.log("Retrieving user data from IDs list of mutual ", this.state.parserType, " ...")
      this.setState({wrapUp: "wrapping up, please wait approximately: " + Math.floor(outputUsers.length/2000) + " minutes "});

      var results = await this.finalize(outputCount, outputUsers)
      console.log("finalized data exists?: ", (results.length > 0 ? true : false));

      this.outputWorkbook(results);

      this.resetState();
    } catch(err) {
      console.log(err);
    }
  }

  getUserTweets = async (username) => {
    var promiseArray = [];
    var i = 1;
    var defaultParams =  {screen_name: this.state.userName, tweet_mode: 'extended', count: 200, include_rts: 'true'}

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const C = await timer.set(2000)
          .then(async () => {
            const A = await axios.post('/ttapi/getUserTweets', defaultParams);
            const B = A.data.map(tweet => {
              const tweetObj = {
                "CREATED_AT": tweet.created_at,
                "ID": tweet.id,
                "TEXT": tweet.full_text,
                "REPLY TO STATUS": tweet.in_reply_to_status_id,
                "RETWEET?": tweet.retweeted_status,
                "RETWEET_COUNT": tweet.retweet_count,
                "FAVORITE_COUNT": tweet.favorite_count,
                "REPLY_COUNT": tweet.reply_count,
                "URL": tweet.quoted_status_permalink.url,
                "RETWEETED...?": tweet.retweeted,
                "FAVORITED...?": tweet.favorited
              }
              return tweetObj
            });
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed ", String(B.length), " tweets");
            this.setState({parseFriend: "Processing up to 3200 tweets; currently have processed: " + String(i-1) + " tweets"})
            const maxid = String(B[B.length-1].ID-1)
            console.log(maxid);
            defaultParams = {screen_name: this.state.userName, tweet_mode: 'extended', count:200, include_rts: 'true', max_id: maxid};
            return B
          });
        promiseArray.push(C);
      } catch(e) {
        console.log(e)
      }
      i+=200
    } while (i<3200)

    const result = await Promise.all(promiseArray);
    const tweetHist = [];
    result.forEach(array =>
      array.forEach(user =>
        tweetHist.push(user)
      )
    );
    return tweetHist
  }

  getUserNames = async (userids) => {
    var promiseArray = [];
    var i = 0;

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const C = await timer.set(3100)
          .then(async () => {
            const A = await axios.post('/ttapi/getUserNames', {data: userids.slice(i,i+100)});
            const B = A.data.map(user => user.screen_name)
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed users: ", String(i)," - ", String(i+100));
            return B
          });
        promiseArray.push(C);
      } catch(e) {
        console.log(e)
      }
      i+=100
    } while (i<userids.length)

    const result = await Promise.all(promiseArray);
    const usernames = [];
    result.forEach(array =>
      array.forEach(user =>
        usernames.push(user)
      )
    );
    return usernames
  }

  getFollowerIDs = async (usernames) => {
    var promiseArray = []
    var i=0
    var limit = 0;
    var listArray = []
    var listLength;
    var newVal = 0;

    if (this.state.userListLength <= 500) {
      limit = this.state.userListLength
      for (var j=0;j<limit;j++) {
        listArray.push(j)
      }
    } else {
      listLength = this.state.userListLength-1
      limit = 500
      this.setState({userListLength: limit})
      console.log("sampling method selected: ", this.state.sampling)
      if (this.state.sampling === "reverse") {
        do {
          listArray.push(newVal)
          newVal += 1
        } while (listArray.length < limit)
      } else if (this.state.sampling === "random") {
        do {
          const newVal = Math.floor(Math.random() * listLength)
          if (!listArray.includes(newVal)) {
            listArray.push(newVal)
          }
        } while (listArray.length < limit)
      } else {
        do {
          listArray.push(listLength-newVal)
          newVal += 1
        } while (listArray.length < limit)
      }
    }

    console.log("limit: ", limit);

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const B = await timer.set(61000)
          .then(async () => {
            const A = await axios.post('/ttapi/getFollowerIDs', {data: usernames[listArray[i]]});
            this.setState({parseFriend: "processing user " + String(i+1) + " out of " + this.state.userListLength + " ..."})
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed user: ", String(i+1), " name: ", usernames[listArray[i]]);
            return A.data
          });
          promiseArray.push(B);
      } catch(e) {
        console.log(e)
      }
      i+=1
    } while (i<limit) //userNamesList1.length)

    const result = await Promise.all(promiseArray);
    const userids = [];
    result.forEach(array => {
      if (array.length > 0) {
        var temp = array.filter(user => user !== undefined);
        userids.push(temp);
      }
    });
    return userids
  }

  getFriendIDs = async (usernames) => {
    var promiseArray = []
    var i=0
    var limit = 0;
    var listArray = []
    var listLength;
    var newVal = 0;

    if (this.state.userListLength <= 500) {
      limit = this.state.userListLength
      for (var j=0;j<limit;j++) {
        listArray.push(j)
      }
    } else {
      listLength = this.state.userListLength
      limit = 500
      this.setState({userListLength: limit})
      console.log("sampling method selected: ", this.state.sampling)
      if (this.state.sampling === "reverse") {
        do {
          listArray.push(newVal)
          newVal += 1
        } while (listArray.length < limit)
      } else if (this.state.sampling === "random") {
        do {
          const newVal = Math.floor(Math.random() * listLength)
          if (!listArray.includes(newVal)) {
            listArray.push(newVal)
          }
        } while (listArray.length < limit)
      } else {
        do {
          listArray.push(listLength-newVal)
          newVal += 1
        } while (listArray.length < limit)
      }
    }

    console.log("limit: ", limit);

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const B = await timer.set(61000)
          .then(async () => {
            const A = await axios.post('/ttapi/getFriendIDs', {data: usernames[listArray[i]]});
            this.setState({parseFriend: "processing user " + String(i+1) + " out of " + this.state.userListLength + " ..."})
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed user: ", String(i+1), " name: ", usernames[listArray[i]]);
            return A.data
          });
          promiseArray.push(B);
      } catch(e) {
        console.log(e)
      }
      i+=1
    } while (i<limit) //userNamesList1.length)

    const result = await Promise.all(promiseArray);
    const userids = [];
    result.forEach(array => {
      if (array.length > 0) {
        var temp = array.filter(user => user !== undefined);
        userids.push(temp);
      }
    });
    return userids
  }

  mutualIds = async(userids) => {
    const outputCount = {}
    userids.forEach(array => {
      array.forEach(user => {
        if (outputCount[user]) {
          outputCount[user] += 1;
        } else {
          outputCount[user] = 1;
        }
      })
    });

    console.log(outputCount)

    // var keys = Object.keys(outputCount)
    // var percentile = Math.floor(keys.length*0.95)
    // console.log("95th percentile index: ", percentile)
    //
    // var values = Object.values(outputCount)
    // var sortValues = values.sort((a, b) => a - b)
    // console.log("sorted values: ", sortValues.length)
    //
    // var criteria = sortValues[percentile-1]
    // console.log("95th percentile value: ", criteria)
    //
    // if ((criteria/this.state.userListLength) < 0.05) {
    //   console.log("criteria value is less than 5%, adjusting . . .")
    //   var maxVal = sortValues[sortValues.length-1]
    //   if (Math.floor(0.05*this.state.userListLength) > maxVal) {
    //     criteria = Math.ceil(maxVal/2)
    //     console.log("NOTICE: USING NEW CRITERIA VALUE OF: ", criteria)
    //   } else {
    //     criteria = Math.floor(0.05*this.state.userListLength)
    //     console.log("NOTICE: USING NEW CRITERIA VALUE OF: ", criteria)
    //   }
    // }

    var arr = [];

    for (var key in outputCount) {
      if (outputCount.hasOwnProperty(key)) {
        arr.push([key, outputCount[key]]);
      }
    }
    console.log(arr)

    arr = arr.sort(function(a, b) {
      return a[1]-b[1]; // compare numbers
    });

    console.log(arr)

    const newObj = {}
    for (var i =  arr.length-1001; i < arr.length; i++) {
        var key = sortedArray[i][0];
        var value = sortedArray[i][1];
        newObj[key] = value;
    }

    // const newObj = {}
    // keys.filter((key) => outputCount[key] >= criteria).forEach((key) => {
    //   // newObj[key] = outputCount[key]
    //   if (Object.keys(newObj).length <= 1000) {
    //       newObj[key] = outputCount[key]
    //   }
    // })
    console.log("newobj length: ", Object.keys(newObj).length)

    const outputUsers = Object.keys(newObj);
    return [newObj, outputUsers]
  }

  finalize = async(userCount, userids) => {
    var promiseArray = []
    var i=0

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const C = await timer.set(3100)
          .then(async () => {
            const A = await axios.post('/ttapi/getUserNames', {data: userids.slice(i,i+100)});
            const B = A.data.map(user => {
              const userObj = {
                "USER_ID": user.id,
                "USER_NAME": user.name,
                "SCREEN_NAME": user.screen_name,
                "FOLLOWER_COUNT": user.followers_count,
                "DESCRIPTION": user.description,
                "LOCATION": user.location,
                "VERIFIED": user.verified,
                "DATE_JOINED": user.created_at
              }
              return userObj
            });
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed users: ", String(i)," - ", String(i+100));
            return B
          });
        promiseArray.push(C);
      } catch(e) {
        console.log(e)
      }
      i+=100
    } while (i<userids.length)

    const result = await Promise.all(promiseArray);
    const usernames = [];
    result.forEach(array =>
      array.forEach(user =>
        usernames.push(user)
      )
    );

    usernames.forEach(obj => {
      const objID = String(obj.USER_ID)
      obj.MUTUAL_COUNT = userCount[objID];
    });

    return usernames
  }

  render() {
    return (
      <div class="dashboard-child-component">
        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">USER TWEET HISTORY</h6>
          <form id="tweetForm" onSubmit={this.handleSubmit}>
            <div class="input-field col s12">
              <input id="userName" type="text" class="validate" onChange={this.onChange}/>
              <label for="userName">Username</label>
            </div>
            <button
              class={"btn " + (this.state.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
              type="submit"
              name="action">
              Process
            </button>
            <div
              class="preloader-wrapper small active"
              style={{
              top: '10px',
              marginLeft: '5px',
              display: (this.state.loading === "tweet-parser" ? 'inline-block' : 'none')
            }}>
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </form>
          <br/>
          <div
            class=""
            style={{
            marginTop: '10px',
            display: (this.state.loading === "tweet-parser" ? 'block' : 'none')
          }}>
            <p>user input: {this.state.userName}</p>
            <p>{this.state.parseFriend}</p>
          </div>
        </div>
        <br/>
        <br/>
        <h6 style={{color: 'black', fontWeight: '900'}}>OPTIONS</h6>
        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">SAMPLING TYPE</h6>
              <form onChange={this.onChangeSample}>
              <label style={{marginRight:'5px'}}>
                <input id="reverse" name="group1" type="radio" defaultChecked />
                <span>Reverse Chrono (default)</span>
              </label>
              <label style={{marginRight:'5px'}}>
                <input id="chrono" name="group1" type="radio" />
                <span>Chronological</span>
              </label>
              <label>
                <input id="random" name="group1" type="radio"  />
                <span>Randomized</span>
              </label>
          </form>

          <br/>

            <h6 class="bold">GROUP TYPE</h6>
                <form onChange={this.onChangeParser}>
                <label style={{marginRight:'5px'}}>
                  <input id="friends" name="group1" type="radio" defaultChecked />
                  <span>Friends</span>
                </label>
                <label style={{marginRight:'5px'}}>
                  <input id="followers" name="group1" type="radio" />
                  <span>Followers</span>
                </label>
            </form>

        </div>
        <h6 style={{color: 'black', fontWeight: '900'}}>FUNCTIONS</h6>
        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">FILE UPLOAD</h6>

          <form id="fileForm" onSubmit={this.handleSubmit}>

            <div class="file-field input-field">
              <div class={"btn "  + (this.state.disableButton ? 'disabled' : 'grey darken-2')}>
                <span>UPLOAD<i class="material-icons right" style={{margin: '0px'}}>file_upload</i></span>
                <input type="file" name="file" id="fileUpload" onChange={this.onChange}/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
              </div>
            </div>

            <button
              class={"btn " + (this.state.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
              type="submit"
              name="action">
              Process
            </button>

            <div
              class="preloader-wrapper small active"
              style={{
              top: '10px',
              marginLeft: '5px',
              display: (this.state.loading === "list-parser" ? 'inline-block' : 'none')
            }}>
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </form>

          <br/>

          <div
            class=""
            style={{
            marginTop: '10px',
            display: (this.state.loading === "file-parser" ? 'block' : 'none')
          }}>
            <p>users read from file: {this.state.fileUsers}</p>
            <p>{this.state.parseFriend}</p>
            <p>{this.state.aggregateListLength}</p>
            <p>{this.state.wrapUp}</p>
          </div>
        </div>
        <br/>
        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">SINGLE USER INPUT</h6>
          <form id="userForm" onSubmit={this.handleSubmit}>
            <div class="input-field col s12">
              <input id="userName" type="text" class="validate" onChange={this.onChange}/>
              <label for="userName">Username</label>
            </div>

            <button
              class={"btn " + (this.state.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
              type="submit"
              name="action">
              Process
            </button>

            <div
              class="preloader-wrapper small active"
              style={{
              top: '10px',
              marginLeft: '5px',
              display: (this.state.loading === "user-parser" ? 'inline-block' : 'none')
            }}>
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </form>
          <br/>
          <div
            class=""
            style={{
            marginTop: '10px',
            display: (this.state.loading === "user-parser" ? 'block' : 'none')
          }}>
            <p>user input: {this.state.userName}</p>
            <p>{this.state.parseFriend}</p>
            <p>{this.state.aggregateListLength}</p>
            <p>{this.state.wrapUp}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
