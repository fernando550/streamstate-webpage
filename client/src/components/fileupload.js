import React, {Component} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import XLSX from 'xlsx';

class FileUpload extends Component {

  // Initialize state
  state = {
    errorMsg: '',
    loading: false,
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
        loading: false,
        disableUserParse: true
      });
      await this.processFile();
    } else {
      this.setState({
        loading: false,
        disableFileParse: true
      });
      await this.processUser();
    }

    this.setState({
      loading: false,
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
          "DATE_JOINED"
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
          let res = await axios.post('/ttapi/fileparse', {data: results.data});
          let data = res.data;
          this.outputWorkbook(data);
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
      let res = await axios.post('/ttapi/userparse', {data: this.state.userName});
      let data = res.data;
      this.outputWorkbook(data);
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
              display: (this.state.loading ? 'block' : 'none')
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
              display: (this.state.loading ? 'block' : 'none')
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
