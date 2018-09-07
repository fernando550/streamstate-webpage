import React, {Component} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import XLSX from 'xlsx';

class Dashboard extends Component {

  // Initialize state
  state = {
    errorMsg: '',
    loading: false,
    serverData: null,
    fileUpload: null
  }

  onChange = (e) => {
    this.setState({fileUpload:e.target.files[0]})
  }

  handleSubmit = async (e) => {
	e.preventDefault();

  this.setState({loading: true});

  try{
    await Papa.parse(this.state.fileUpload, {
    	complete: async (results) => {
    		console.log("papaparse results: \n", results);
        console.log("axios request call...")
        let res = await axios.post('/ttapi/run', {data: results.data});
        let data = res.data;

        // if (data == undefined || data == null) {
        //   console.log('response data: \n', data);
        // } else {
        //   throw new Error("response data came back empty")
        // }

        var ws_name = "TwitData";
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(
          res.data,
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
    });
  } catch(err) {
    console.log(err);
    this.setState({errorMsg: err.message});
  }
  this.setState({loading: false});
}

  render() {
    return (
      <div class="row" id="dashboard-component">
        <div class="col s2" style={{backgroundColor: 'grey', height: '100%'}}>
        </div>
        <form class="col s10" onSubmit={this.handleSubmit}>
          <div
            class="red row"
            style={{
              display: (this.state.error !== '' ? 'block' : 'none'),
              color: 'white',
              width: '350px',
              borderRadius: '2px',
              paddingLeft: '5px',
              marginLeft: '5px'
          }}>
            {this.state.errorMsg}
          </div>
          <div class="form-group row">
            <label for="formControlFile">Upload Data</label>
            <input type="file" name="file" class="form-control-file" id="formControlFile" onChange={this.onChange}/>
            <button
              class="btn indigo darken-4 waves-effect waves-light"
              type="submit"
              name="action">
              Process
              <i class="material-icons right">send</i>
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
          </div>
        </form>
      </div>
    );
  }
}

export default Dashboard;
