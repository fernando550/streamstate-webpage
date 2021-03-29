import React  from "react";
import { Route } from "react-router-dom";

import { Menu } from '../nuurd/components/menu';

// all sub-views of dashboard
import { TweetHistory } from '../nuurd/views/tweetHistory';
import { MutualNetworkFile } from '../nuurd/views/mutualNetworkFile';
import { MutualNetworkUser } from '../nuurd/views/mutualNetworkUser';
import { Network } from '../nuurd/views/network';
import { Help } from '../nuurd/views/help';

export const Dashboard = () => {
  return (
    <div className="container view-component py-4 rounded-lg">
      <Menu />
      <Route path="/dashboard/tweet-history" component={TweetHistory}/>
      <Route path="/dashboard/mutual-network-file" component={MutualNetworkFile}/>
      <Route path="/dashboard/mutual-network-user" component={MutualNetworkUser}/>
      <Route path="/dashboard/network" component={Network}/>
      <Route path="/dashboard/help" component={Help}/>
      {/* <Functions /> */}
    </div>
  );
};