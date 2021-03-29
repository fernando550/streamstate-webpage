import React from 'react';

export const Help = () => {
    return (
        <div className="p-4 rounded-lg z-depth-5 bg-white">
          <h5 className="bold">Welcome to Nuurd Analytics!</h5>
          <p className="bold">{`Thank you for using our product. StreamState has built a simple-to-use, yet powerful tool to retrieve data from Twitter.`}</p>
          <p className="bold">{`There are currently 4 functions in the dashboard that this tool performs:`}</p>
          <ol>
            <li className="bold">{`
              Tweet History function takes a single user handle and will find up to 3200 of the most recent tweets made by that user (including retweets)
            `}</li>
            <br/>
            <li className="bold">{`
              Sphere of Influence (File): Accepts a comma-delimited (.csv) file containing a single column-list of twitter handles and return a list of the mutual friends/followers which the users in
              the list all have in common along with their user data. Look below for notes on SOI.
            `}</li>
            <br/>
            <li className="bold">{`
              Sphere of Influence (User): Accepts a single user handle, return a friend's list for that user, and then retrieve a friend's list for each of those users in the returned list.
              Mutual friends/followers are then aggregated into a finalized list. Look below for notes on SOI.
            `}</li>
          </ol>
          <p className="bold">{`
            NOTE1: SOI functions have a filtering option where you can select whether you want to analyze the friends or followers of the data input.
            There is also an option for the way in which you sample the data (random, chronological, and reverse chronological). Sampling may want to be for the
            sole purpose of adding randomization. This is to say that if I sample with default sampling options, I am capture the absolute most recent data.
          `}</p>
          <p className="bold">{`
            NOTE2: For file uploads please only use .csv files.
          `}
          </p>
          <p className="bold">{`
            NOTE3: Do not include the '@' sign for any Twitter handles you use, either when uploading files, or inputting a user.
          `}</p>
          <p className="bold">{`
            For any further questions please contact us at fnarbona@streamstateconsulting.com.
          `}</p>
        </div>
    );
  }
