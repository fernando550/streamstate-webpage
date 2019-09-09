import React, {Component} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import XLSX from 'xlsx';
import ProgressBar from './modules/progressbar';
import ParseMenu from './modules/parsemenu';
import ParseMenu1 from './modules/parsemenu1';
import Help from './help';
const Timeout = require('await-timeout');


// need to write a user data function that will ouput user data in a table
// need to write a function that will take a file upload and provide user data

class Description extends Component {
  render() {
    return (
      <div class="row z-depth-5" style={{
        backgroundColor: 'white',
        padding: '1%',
        minHeight: '100%',
        borderRadius: '5px',
      }}>
        {this.props.text}
      </div>
    )
  }
}

class TweetHist extends Component {
  render() {
    return (
      <div class="row z-depth-5 fileupload-func-panel" style={{margin: '0 auto'}}>
        <h6 class="bold">USER-PARSER</h6>
        <form id="tweetForm" onSubmit={this.props.handleSubmit}>
          <div class="input-field col s12">
            <input id="userName" type="text" class="validate" onChange={this.props.handleChange}/>
            <label for="userName">Enter a user handle (do not include the '@' symbol)</label>
          </div>
          <button
            class={"btn " + (this.props.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
            type="submit"
            name="action">
            Process
          </button>
          <br/>
        </form>
        <br/>
        <div
          class=""
          style={{
          marginTop: '10px',
          display: (this.props.loading === "tweet-parser" ? 'block' : 'none')
        }}>
          <p>user input: {this.props.userName}</p>
          <p>{this.props.parseFriend}</p>
          <ProgressBar loading={this.props.loading} progress={this.props.progressBar} text={this.props.parseFriend}/>
        </div>
      </div>
    )
  }
}

class FileParser extends Component{
  render() {
    return (
      <div class="row z-depth-5 fileupload-func-panel">
        <h6 class="bold">FILE-PARSER</h6>
        <form id="fileForm" onSubmit={this.props.handleSubmit}>
          <div class="file-field input-field">
            <div class={"btn "  + (this.props.disableButton ? 'disabled' : 'grey darken-2')}>
              <span>UPLOAD<i class="material-icons right" style={{margin: '0px'}}>file_upload</i></span>
              <input type="file" name="file" id="fileUpload" onChange={this.props.handleChange}/>
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text"/>
            </div>
          </div>

          <button
            class={"btn " + (this.props.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
            type="submit"
            name="action">
            Process
          </button>
        </form>
        <br/>

        <div
          class=""
          style={{
          marginTop: '10px',
          display: (this.props.loading === "file-parser" ? 'block' : 'none')
        }}>
          <p>users read from file: {this.props.fileUsers}</p>
          <p>{this.props.parseFriend}</p>
          <p>{this.props.aggregateListLength}</p>
          <ProgressBar loading={this.props.loading} progress={this.props.progressBar} text={this.props.parseFriend}/>
          <p>{this.props.wrapUp}</p>
        </div>
      </div>
    )
  }
}

class FileParser2 extends Component{
  render() {
    return (
      <div class="row z-depth-5 fileupload-func-panel">
        <h6 class="bold">FILE-PARSER</h6>
        <form id="userList" onSubmit={this.props.handleSubmit}>
          <div class="file-field input-field">
            <div class={"btn "  + (this.props.disableButton ? 'disabled' : 'grey darken-2')}>
              <span>UPLOAD<i class="material-icons right" style={{margin: '0px'}}>file_upload</i></span>
              <input type="file" name="file" id="fileUpload" onChange={this.props.handleChange}/>
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text"/>
            </div>
          </div>

          <button
            class={"btn " + (this.props.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
            type="submit"
            name="action">
            Process
          </button>
        </form>
        <br/>

        <div
          class=""
          style={{
          marginTop: '10px',
          display: (this.props.loading === "file-parser" ? 'block' : 'none')
        }}>
          <p>users read from file: {this.props.fileUsers}</p>
          <p>{this.props.parseFriend}</p>
          <p>{this.props.aggregateListLength}</p>
          <ProgressBar loading={this.props.loading} progress={this.props.progressBar} text={this.props.parseFriend}/>
          <p>{this.props.wrapUp}</p>
        </div>
      </div>
    )
  }
}

class UserParser extends Component {
  render() {
    return (
      <div class="row z-depth-5 fileupload-func-panel">
        <h6 class="bold">USER-PARSER</h6>
        <form id="userForm" onSubmit={this.props.handleSubmit}>
          <div class="input-field col s12">
            <input id="userName" type="text" class="validate" onChange={this.props.handleChange}/>
            <label for="userName">Enter a user handle (do not include the '@' symbol)</label>
          </div>

          <button
            class={"btn " + (this.props.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
            type="submit"
            name="action">
            Process
          </button>
        </form>
        <br/>
        <div
          class=""
          style={{
          marginTop: '10px',
          display: (this.props.loading === "user-parser" ? 'block' : 'none')
        }}>
          <p>user input: {this.props.userName}</p>
          <p>{this.props.parseFriend}</p>
          <p>{this.props.aggregateListLength}</p>
          <ProgressBar loading={this.props.loading} progress={this.props.progressBar} text={this.props.parseFriend}/>
          <p>{this.props.wrapUp}</p>
        </div>
      </div>
    )
  }
}

class UserParser2 extends Component {
  render() {
    return (
      <div class="row z-depth-5 fileupload-func-panel">
        <h6 class="bold">USER-PARSER</h6>
        <form id="userList" onSubmit={this.props.handleSubmit}>
          <div class="input-field col s12">
            <input id="userName" type="text" class="validate" onChange={this.props.handleChange}/>
            <label for="userName">Enter a user handle (do not include the '@' symbol)</label>
          </div>

          <button
            class={"btn " + (this.props.disableButton ? 'disabled' : 'grey darken-2 waves-effect waves-light')}
            type="submit"
            name="action">
            Process
          </button>
        </form>
        <br/>
        <div
          class=""
          style={{
          marginTop: '10px',
          display: (this.props.loading === "user-parser" ? 'block' : 'none')
        }}>
          <p>user input: {this.props.userName}</p>
          <p>{this.props.parseFriend}</p>
          <p>{this.props.aggregateListLength}</p>
          <ProgressBar loading={this.props.loading} progress={this.props.progressBar} text={this.props.parseFriend}/>
          <p>{this.props.wrapUp}</p>
        </div>
      </div>
    )
  }
}

class Functions extends Component {
  // Initialize state
  state = {
    errorMsg: '',
    loading: false,
    serverData: null,
    fileUpload: null,
    userName: null,
    disableButton: false,
    parseFriend: 'initializing, please wait a up to few minutes...',
    progressBar: '0%',
    userListLength: '...',
    aggregateListLength: '',
    wrapUp: '',
    sampling: 'reverse',
    parserType: 'friends',
    outputFileName: '',
    view: [
      {
        id: 'tweetView',
        text: 'TWEET-HISTORY',
        view: true
      },
      {
        id: 'fileView',
        text: 'FILE-PARSER',
        view: false
      },
      {
        id: 'userView',
        text: 'USER-PARSER',
        view: false
      },
      {
        id: 'userList',
        text: 'USER-DATA',
        view: false
      },
      {
        id: 'helpView',
        text: 'HELP',
        view: false
      },
      {
        id: 'signOut',
        text: 'SIGN OUT',
        view: false
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps: ", nextProps)
    this.setState(nextProps)
    console.log("did component update? ", this.state.view)
  }

  resetState = function () {
    this.setState({
      errorMsg: '',
      loading: false,
      serverData: null,
      fileUpload: null,
      userName: null,
      disableButton: false,
      parseFriend: 'initializing, please wait up to a few minutes...',
      progressBar: '0%',
      userListLength: '...',
      aggregateListLength: '',
      wrapUp: '',
      sampling: 'reverse',
      parserType: 'friends',
      outputFileName: '',
      view: [
        {
          id: 'tweetView',
          text: 'TWEET-HISTORY',
          view: true
        },
        {
          id: 'fileView',
          text: 'FILE-PARSER',
          view: false
        },
        {
          id: 'userView',
          text: 'USER-PARSER',
          view: false
        },
        {
          id: 'userList',
          text: 'USER-DATA',
          view: false
        },
        {
          id: 'helpView',
          text: 'HELP',
          view: false
        },
        {
          id: 'signOut',
          text: 'SIGN OUT',
          view: false
        }
      ]
    });
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

  onSubmit = async (e) => {
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

    if (e.target.id === "userList") {
      console.log("userList Pressed!")
      await this.getUserDataInput();
    }

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
          "IS REPLY?",
          "IS RETWEET?",
          "IS QUOTE TWEET?",
          "QUOTE COUNT",
          "RETWEET COUNT",
          "FAVORITE COUNT",
          "TWEET URL",
          "QUOTE TWEET URL",
          "SOURCE"
        ]
      }
    );

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, 'twitter-data.xlsb');
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
            loading: 'file-parser',
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
                "CREATED_AT": tweet.created_at.substring(0,19),
                "ID": tweet.id_str,
                "TEXT": tweet.full_text,
                "IS REPLY?": (tweet.in_reply_to_status_id ? tweet.in_reply_to_status_id : false),
                "IS RETWEET?": (tweet.retweeted_status ? true : false),
                "IS QUOTE TWEET?": (tweet.quoted_status_id ? tweet.quoted_status_id : false),
                "QUOTE COUNT": tweet.quote_count,
                "RETWEET COUNT": tweet.retweet_count,
                "FAVORITE COUNT": tweet.favorite_count,
                "TWEET URL": (tweet.entities.urls[0] ? tweet.entities.urls[0].url : false),
                "QUOTE TWEET URL": (tweet.quoted_status_permalink ? tweet.quoted_status_permalink.url : 'NONE'),
                "SOURCE": tweet.source.substring(tweet.source.indexOf(">")+1,tweet.source.lastIndexOf("<"))
              }
              return tweetObj
            });
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed ", String(B.length), " tweets");
            this.setState({
              parseFriend: "Processing up to 3200 tweets; currently have processed: " + String(i-1) + " tweets",
              progressBar: Math.floor((String(i-1)/3200)*100).toString() + "%"
            })

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
            this.setState({
              parseFriend: "processing user " + String(i+1) + " out of " + this.state.userListLength + " ...",
              progressBar: Math.floor((String(i+1)/this.state.userListLength)*100).toString() + "%"
            })
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
            this.setState({
              parseFriend: "processing user " + String(i+1) + " out of " + this.state.userListLength + " ...",
              progressBar: Math.floor((String(i+1)/this.state.userListLength)*100).toString() + "%"
            })
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

  getUserDataList = async () => {
    try{
      await Papa.parse(this.state.fileUpload, {
        complete: async (results) => {
          this.setState({
            loading: 'file-parser',
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

          this.setState({wrapUp: "processing, please wait approximately: " + Math.floor((usernames.length*3)/60) + " minutes"});

          results = await this.finalize2(usernames)
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

  getUserDataInput = async () => {
    try{
      this.setState({
        loading: 'user-parser',
        disableButton: true,
        outputFileName: 'User_' + this.state.parserType + ' ' + this.state.userName
      });

      let userids;

      console.log("initializing user-parser...")

      if (this.state.parserType === "friends") {
        console.log("Retrieving friend IDs for selected user ...")
        userids = await this.getFriendIDs2(this.state.userName)
      } else {
        console.log("Retrieving follower IDs for selected user ...")
        userids = await this.getFollowerIDs2(this.state.userName)
      }

      console.log("Number of ", this.state.parserType, " IDs retrieved: ", userids.length)
      console.log("Retrieving screen names from list of IDs ...")
      var usernames = await this.getUserNames(userids)

      console.log("Retrieved user names for: ", usernames.length, " out of ", userids.length, " user IDs");
      this.setState({userListLength: String(usernames.length)})

      this.setState({wrapUp: "wrapping up, please wait approximately: " + Math.floor((usernames.length*3)/60) + " minutes "});

      var results = await this.finalize2(usernames)
      console.log("finalized data exists?: ", (results.length > 0 ? true : false));

      this.outputWorkbook(results);

      this.resetState();
    } catch(err) {
      console.log(err);
    }
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
        var akey = arr[i][0];
        var value = arr[i][1];
        newObj[akey] = value;
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

  getFriendIDs2 = async (username) => {
    var promiseArray = []
    var i=0
    var listArray = []
    var listLength;
    var newVal = 0;
    var cursor = -1;

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const B = await timer.set(61000)
          .then(async () => {
            const A = await axios.post('/ttapi/getFriendIDs2', {data: username, cursor: cursor});
            cursor = A.data.cursor
            this.setState({
              parseFriend: "Retrieved " + String((i)*5000+A.data.ids.length) + " out of 50,000 max friends ...",
              progressBar: Math.floor(String(i+1)/10*100).toString() + "%"
            })
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed ", String((i)*5000+A.data.ids.length), "total friends" );

            return A.data.ids
          });
          promiseArray.push(B);
      } catch(e) {
        console.log(e)
      }
      i+=1
    } while (i<10 || cursor === 0) //userNamesList1.length)

    const result = await Promise.all(promiseArray);
    const userids = [];
    result.forEach(array => {
      if (array.length > 0) {
        var temp = array.filter(user => user !== undefined);
        temp.forEach(item => userids.push(item));
      }
    });
    console.log(userids)
    return userids
  }

  getFollowerIDs2 = async (username) => {
    var promiseArray = []
    var i=0
    var listArray = []
    var listLength;
    var newVal = 0;
    var cursor = -1;

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const B = await timer.set(61000)
          .then(async () => {
            const A = await axios.post('/ttapi/getFollowerIDs2', {data: username, cursor: cursor});
            this.setState({
              parseFriend: "Retrieved " + String((i)*5000+A.data.ids.length) + " out of 50,000 max followers ...",
              progressBar: Math.floor(String(i+1)/10*100).toString() + "%"
            })
            var end = Date.now() - start
            console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed ", String((i)*5000+A.data.ids.length), "total followers" );
            return A.data
          });
          promiseArray.push(B);
      } catch(e) {
        console.log(e)
      }
      i+=1
    } while (i<10 || cursor === 0) //userNamesList1.length)

    const result = await Promise.all(promiseArray);
    const userids = [];
    result.forEach(array => {
      if (array.length > 0) {
        var temp = array.filter(user => user !== undefined);
        temp.forEach(item => userids.push(item));
      }
    });
    console.log(userids)
    return userids
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

  finalize2 = async(usernames) => {
    var promiseArray = []
    var i=0

    do {
      try {
        const timer = new Timeout();
        var start = Date.now();
        const C = await timer.set(3100)
          .then(async () => {
            const A = await axios.post('/ttapi/getUserData', {data: usernames.slice(i,i+100)});
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
    } while (i<usernames.length)

    const result = await Promise.all(promiseArray);
    const usernames2 = [];
    result.forEach(array =>
      array.forEach(user =>
        usernames2.push(user)
      )
    );

    // filter username2 by VERIFIED
    // sort username2 by FOLLOWER_COUNT

    return usernames2
  }

  render() {
    return (
      <div class="dashboard-child-component">
        {this.state.view.map((item, i) => (
          (item.id==='tweetView' && item.view===true)
          ? [
            <Description
              text={<p>info: Here you can enter a user and receive up to the latest 3200 tweets
                with tweet data such as location, time, retweet count, etc...</p>}
            />,
            <br/>,
            <TweetHist key={i} {...this.state} handleSubmit={this.onSubmit} handleChange={this.onChange}/>
          ]
          : (item.id==="fileView" && item.view===true)
          ? [
            <Description
              text={
              <div>
                <p>info: This function will find mutual followers and friends amongst a group of people. This means you will be able
                  to speculate and quantify the immediate network of recent follower or friend relationships amongst a group of people.</p>
                <ol>
                  <li>
                    Select the type of sampling you want from your data (The tool samples from a larger pool of recent data).
                  </li>
                  <li>
                    Second, Select whether you want to pull followers or friends data.
                  </li>
                  <li>
                    Third, upload the data you want to analyze in the .csv format (Note: do not include the '@' symbol in twitter handle names).
                  </li>
                </ol>
              </div>
              }
            />,
            <br/>,
            <ParseMenu changeSampling={this.onChangeSample} changeParser={this.onChangeParser}/>,
            <br/>,
            <FileParser key={i} {...this.state} handleSubmit={this.onSubmit} handleChange={this.onChange}/>
          ]
          : (item.id==="userView" && item.view===true)
          ? [
            <Description
            text={
            <div>
              <p>infot: This function will find mutual followers and friends amongst a group of people, but will start with the input of a single user handle.
                This means you will not be able to select the group of users you want to analyze, however, this is the purpose of the single user function.
                You will be able to speculate and quantify the network of most recent followers or friends a user is reaching.</p>
              <ol>
                <li>
                  Select the type of sampling you want from your data (The tool samples from a larger pool of recent data).
                </li>
                <li>
                  Second, Select whether you want to pull followers or friends data.
                </li>
                <li>
                  Third, enter the user handle you want to analyze (Note: do not include the '@' symbol in twitter handle names)
                </li>
              </ol>
            </div>
            }
          />,
            <br/>,
            <ParseMenu changeSampling={this.onChangeSample} changeParser={this.onChangeParser}/>,
            <br/>,
            <UserParser key={i} {...this.state} handleSubmit={this.onSubmit} handleChange={this.onChange}/>
          ]
          : (item.id==="helpView" && item.view===true)
          ? <Help key={i}/>
          : (item.id==="userList" && item.view===true)
          ? [
            <Description
              text={
              <div>
                <p>info: This function will find user information for up to 50,000 friends or followers of a single user.</p>
              </div>
              }
            />,
            <br/>,
            <ParseMenu1 changeSampling={this.onChangeSample} changeParser={this.onChangeParser}/>,
            <br/>,
            <UserParser2 key={i} {...this.state} handleSubmit={this.onSubmit} handleChange={this.onChange}/>
          ]
          : <a key={i}></a>
          )
        )}
      </div>
    );
  }
}

export default Functions;
