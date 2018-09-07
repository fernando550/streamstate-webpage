import React, {Component} from 'react';

class Help extends Component {
  render() {
    return (
      <div class="dashboard-child-component">
        <div class="row z-depth-5 fileupload-func-panel">
          <h6 class="bold">Welcome</h6>
          <p class="bold">{`Thank you for using our product. StreamState has built a simple-to-use, yet powerful tool to parse data from Twitter's API.`}</p>
          <p class="bold">{`There are currently two functions in the dashboard that this tool performs:`}</p>
          <ol>
            <li class="bold">{`
              First, it can parse a .csv file with a list of twitter handles and return a list of the mutual friends which the users in the list all have.
            `}</li>
            <li class="bold">{`
              Second, it can accept a single user, retrieve that person's friends list, and perform the aforementioned function on that list. That is
              to say that the difference between the functions is in the retrieval of a friends list of a person, as opposed to an organized list of users
              which is fed as an input to the program.
            `}</li>
          </ol>
          <p class="bold">{`
            NOTE: Do not input anything besides a csv file, and do not include the '@' sign in the Twitter handles you look up (whether single user or list).
            For any questions please contact us at streamstateconsulting@gmail.com
          `}</p>
        </div>
      </div>
    );
  }
}

export default Help;
