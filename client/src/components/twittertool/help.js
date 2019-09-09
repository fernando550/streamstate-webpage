import React, {Component} from 'react';

class Help extends Component {
  render() {
    return (
      <div class="dashboard-child-component">
        <div class="row z-depth-5 fileupload-func-panel">
          <h5 class="bold">Welcome to StreamState's Twitter Data Tool</h5>
          <p class="bold">{`Thank you for using our product. StreamState has built a simple-to-use, yet powerful tool to retrieve data from Twitter.`}</p>
          <p class="bold">{`There are currently three functions in the dashboard that this tool performs:`}</p>
          <ol>
            <li class="bold">{`
              Can accept a single user handle as an input and return up to 3200 of the most recent tweets by that user (includes retweets).
              This will return data including time, retweet counts, tweet url, text, etc. (Note: do not include '@' in the user handle)
            `}</li>
            <br/>
            <li class="bold">{`
              Sphere of Influence: Can parse a comma-delimited (.csv) file containing a single column-list of twitter handles and return a list of the mutual friends/followers which the users in
              the list all have in common along with their user data. Look below for notes on SOI.
            `}</li>
            <br/>
            <li class="bold">{`
              Sphere of Influence (Single User): Can accept a single user, return a friend's list for that user, and then retrieve a friend's list for each of those users in the returned list.
              Mutual friends/followers are then aggregated into a finalized list. Look below for notes on SOI.
            `}</li>
          </ol>
          <p class="bold">{`
            NOTE1: SOI functions have a filtering option where you can select whether you want to analyze the friends or followers of the data input.
            There is also an option for the way in which you sample through the data (random, chronological, and rev chronological). Sampling may want to be for the
            sole purpose of adding randomization as all data pulls are still generally the most recent information. This is to say that if I sample with default
            sampling options, I am capture the absolute most recent data.
          `}</p>
          <p class="bold">{`
            NOTE2: For file uploads please only use .csv files. Additionally, do not include the '@' sign for any Twitter handles you look up (whether single user or list).
          `}</p>
          <p class="bold">{`
            For any further questions please contact us at streamstateconsulting@gmail.com.
          `}</p>
        </div>
      </div>
    );
  }
}

export default Help;
