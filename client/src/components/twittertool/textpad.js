processUser = async () => {
  try{
    this.setState({
      loading: 'user-list',
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
          cursor = A.cursor
          this.setState({
            parseFriend: "Retrieved " + String((i+1)*5000) + " out of 50,000 total friends ...",
            progressBar: Math.floor((i+1)/5)*100).toString() + "%"
          })
          var end = Date.now() - start
          console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed ", String((i+1)*5000), "total friends" );

          return A.ids
        });
        promiseArray.push(B);
    } catch(e) {
      console.log(e)
    }
    i+=1
  } while (i<10) //userNamesList1.length)

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
            parseFriend: "Retrieved " + String((i+1)*5000) + " out of 50,000 total followers ...",
            progressBar: Math.floor((String(i+1)/this.state.userListLength)*100).toString() + "%"
          })
          var end = Date.now() - start
          console.log("Elapsed time: ", Math.floor(end/1000), " seconds \n processed ", String((i+1)*5000), "total followers" );
          return A.data
        });
        promiseArray.push(B);
    } catch(e) {
      console.log(e)
    }
    i+=1
  } while (i<10) //userNamesList1.length)

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
