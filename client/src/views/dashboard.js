import React from "react";
import { Route } from "react-router-dom";

import { Menu } from "../components/menu";

// all sub-views of dashboard
import { TweetHistory } from "../views-dash/tweetHistory";
import { MutualNetworkFile } from "../views-dash/mutualNetworkFile";
import { MutualNetworkUser } from "../views-dash/mutualNetworkUser";
import { Network } from "../views-dash/network";
import { Help } from "../views-dash/help";

export const Dashboard = () => {
  return (
    <div className="dashboard view-component py-4">
      <div className="container py-5 w-75">
        <Menu />
        <Route path="/dashboard/tweet-history" component={TweetHistory} />
        <Route
          path="/dashboard/mutual-network-file"
          component={MutualNetworkFile}
        />
        <Route
          path="/dashboard/mutual-network-user"
          component={MutualNetworkUser}
        />
        <Route path="/dashboard/network" component={Network} />
        <Route path="/dashboard/help" component={Help} />
      </div>
    </div>
  );
};
