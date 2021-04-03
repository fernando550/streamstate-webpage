import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function Home() {
  return (
    <div>
    <Jumbotron title={title}/>
      <div class="view-component d-flex flex-column justify-content-center align-items-center">
        <div class="container w-50 d-flex flex-column align-items-start">
          <h1 class="title mx-auto mb-5">Welcome to Nuurd</h1>
          <p>Here at Nuurd, we like to do things differently... let's take for example, your advertising, marketing, or branding needs
            and think for a second about how we can possibly find our audience? There's always Facebook Ads, Google Ads, but what if you're
            too specific, or not specific enough? Okay, well trial and error, or experienced consultants (more time or money), yet, what if
            there was better, easier, faster, done for you?
          </p>
          <p>With Nuurd, you can look at specific users, or even study a group of users to understand their reach and influence. This is
            something unheard of in the industry, something completely new. There are large enterprise tools that cost thousands of dollars
            a year, and which basically do not cater to small companies, but we believe in all our nerds, all our local and small business 
            entrepreneurs. This is why Nuurd is appropriately priced, with different products for different needs, and if you STILL want to
            run with the big dogs, well there's a price point for that too (just sayin').
          </p>
          <p>We hope you like what's cookin', it smells good too.
          </p>
        </div>
      </div>
      </div>
  );
}

const title = `Let's get you some data.`
