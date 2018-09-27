import React, {Component} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import XLSX from 'xlsx';
const Timeout = require('await-timeout');

class FileUpload extends Component {

  // Initialize state
  state = {
    errorMsg: '',
    loading1: false,
    loading2: false,
    serverData: null,
    fileUpload: null,
    userName: null,
    disableUserParse: false,
    disableFileParse: false
  }

  onChange = (e) => {
    e.preventDefault();

    if (e.target.id === 'fileUpload') {
      this.setState({fileUpload:e.target.files[0]})
    } else {
      this.setState({userName: e.target.value});
    }
  }

  handleSubmit = async (e) => {
  	e.preventDefault();

    if (e.target.id === 'fileForm') {
      this.setState({
        loading1: true,
        disableUserParse: true,
        disableFileParse: true
      });
      await this.processFile();
    } else {
      this.setState({
        loading2: true,
        disableUserParse: true,
        disableFileParse: true
      });
      await this.processUser();
    }

    this.setState({
      loading1: false,
      loading2: false,
      disableFileParse: false,
      disableUserParse: false
    });
  }

  outputWorkbook = (data) => {
    var ws_name = "TwitData";
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
          "LOCATION",
          "VERIFIED",
          "DATE_JOINED",
          "MUTUAL_COUNT",
          "MUTUAL_PERCENT_COUNT"
        ]
      }
    );

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, 'twitter-data.xlsb');
  }

  processFile = async () => {
    try{
      await Papa.parse(this.state.fileUpload, {
      	complete: async (results) => {
      		console.log("papaparse results: \n", results);
          console.log("axios file-parse request call...")

          var userNamesList1 = [];
          var promises = [];
          var i = 0;
          var j = 0;

          results.data.forEach(array => {
            array.forEach(user => {
              userNamesList1.push(user);
            });
          });

          console.log("userNamesList1: ", userNamesList1);

          const userIdsAoAPromise = userNamesList1.map(async (name, i) => {
            try {
              const timer = new Timeout();
              const userIdList = await timer.set(i*60000+2000)
                .then(async () => {
                  const friendsList = await axios.post('/ttapi/userparse1', {data: name});
                  return friendsList.data
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


          var promises2 = []
          var i=0
          var j=0

          do {
            try {
              const timer = new Timeout();
              const C = await timer.set(j*300+50)
                .then(async () => {
                  const A = await await axios.post('/ttapi/userparse2', {data: outputUsers.slice(i,i+100)});
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
          this.outputWorkbook(userNamesList2);
      	}
      });
    } catch(err) {
      console.log(err);
      this.setState({errorMsg: err.message});
    }
  }

  processUser = async () => {
    try{
      console.log("axios user-parse request call...")
      let res1 = await axios.post('/ttapi/userparse1', {data: this.state.userName});
      let data1 = res1.data;
      console.log("friend ids: ", data1.length)
      console.log("slice friend ids: ", data1.slice(0,100).length)

      var promises = [];
      var i = 0;
      var j = 0;

      do {
        try {
          const timer = new Timeout();
          const C = await timer.set(j*300+50)
            .then(async () => {
              const A = await axios.post('/ttapi/userparse2', {data: data1.slice(i,i+100)});
              const B = A.data.map(user => user.screen_name)
              return B
            });
          promises.push(C);
        } catch(e) {
          // console.log('ERROR')
        }
        i+=100
        j+=1
      } while (i<data1.length)

      const promiseResult = await Promise.all(promises);
      const userNamesList1 = [];
      promiseResult.forEach(array =>
        array.forEach(user =>
          userNamesList1.push(user)
        )
      );

      console.log("userlist length: ", userNamesList1.length);

      const userIdsAoAPromise = userNamesList1.map(async (name, i) => {
        try {
          const timer = new Timeout();
          const userIdList = await timer.set(i*60000+2000)
            .then(async () => {
              const friendsList = await axios.post('/ttapi/userparse1', {data: name});
              return friendsList.data
            });
            return userIdList
            // return username.data.screen_name;
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

      const outputUsers = Object.keys(outputCount);
      console.log("outputUsers length: ", outputUsers.length);

      var promises2 = []
      var i=0
      var j=0
      do {
        try {
          const timer = new Timeout();
          const C = await timer.set(j*300+50)
            .then(async () => {
              const A = await axios.post('/ttapi/userparse2', {data: outputUsers.slice(i,i+100)});
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

      console.log("promiseResult2 length: ", promiseResult2.length)

      userNamesList2.forEach(obj => {
        const objID = String(obj.USER_ID)
        obj.MUTUAL_COUNT = outputCount[objID];
        obj.MUTUAL_PERCENT_COUNT = Math.round((outputCount[objID]/outputUsers.length)*100)/100;
      });

      console.log("userNamesList2 length: ", userNamesList2.length);

      this.outputWorkbook(userNamesList2);
      // console.log(data);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div class="dashboard-child-component">

        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">LIST PARSER</h6>
          <form id="fileForm" onSubmit={this.handleSubmit}>
            <div class="file-field input-field">
              <div class="btn indigo darken-4">
                <span>UPLOAD<i class="material-icons right" style={{margin: '0px'}}>file_upload</i></span>
                <input type="file" name="file" id="fileUpload" onChange={this.onChange}/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
              </div>
            </div>

            <button
              class={"btn " + (this.state.disableFileParse ? 'disabled' : 'indigo darken-4 waves-effect waves-light')}
              type="submit"
              name="action">
              Process
            </button>

            <div
              class="preloader-wrapper small active"
              style={{
              display: (this.state.loading1 ? 'block' : 'none')
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
        </div>

        <br/>

        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">SINGLE USER PARSER</h6>
          <form id="userForm" onSubmit={this.handleSubmit}>
            <div class="input-field col s12">
              <input id="userName" type="text" class="validate" onChange={this.onChange}/>
              <label for="userName">Username</label>
            </div>

            <button
              class={"btn " + (this.state.disableUserParse ? 'disabled' : 'indigo darken-4 waves-effect waves-light')}
              type="submit"
              name="action">
              Process
            </button>

            <div
              class="preloader-wrapper small active"
              style={{
              display: (this.state.loading2 ? 'block' : 'none')
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
        </div>

      </div>
    );
  }
}

export default FileUpload;
