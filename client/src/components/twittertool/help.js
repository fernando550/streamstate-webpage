import React, {Component} from 'react';

class Help extends Component {
  render() {
    return (
      <div class="dashboard-child-component">
        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">Welcome</h6>
          <p class="bold">{`Thank you for using our product. StreamState has built a simple-to-use, yet powerful tool to parse data from Twitter's API.`}</p>
          <p class="bold">{`There are currently three functions in the dashboard that this tool performs:`}</p>
          <ol>
            <li class="bold">{`
              Tweet-History: Can accept a single user as an input and return up to 3200 of the most recent tweets by that user (includes retweets).
            `}</li>
            <br/>
            <li class="bold">{`
              File-Parser: Can parse a .csv file containing a single column-list of twitter handles and return a list of the mutual friends which the users in the list all have.
            `}</li>
            <br/>
            <li class="bold">{`
              User-Parser: Can accept a single user, return a friend's list for that user, and then retrieve a friend's list for each of those users in the returned list. Mutual friends
              are then aggregated into a finalized list.
            `}</li>
          </ol>
          <p class="bold">{`
            NOTE1: File and user parsers have a filtering option where you can select whether you want to analyze the friends or followers of the data input.
            There is also an option for the way in which you sample through the data (random, chronological, and rev chronological). One notable mention is that,
            by default, Twitter returns all data in reverse chronological order so as to have the most recent data first.
          `}</p>
          <p class="bold">{`
            NOTE2: Do not input anything besides a csv file, and do not include the '@' sign in the Twitter handles you look up (whether single user or list).
            For any questions please contact us at streamstateconsulting@gmail.com
          `}</p>
        </div>
      </div>
    );
  }
}

export default Help;
