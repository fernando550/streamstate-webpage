import React, { useEffect } from "react";

import parallaxIMG from "../images/multicolor-laptop.jpg";
import sscLogo from "../images/logo-text-white.png";

import { Parallax, Background } from 'react-parallax';

export function Jumbotron() {
  return (
    // <div class="parallax-container">
    //   <div class="parallax">
    //     <img alt-text="src" src={parallaxIMG} />
    //   </div>
    //   <div class="h-100 d-flex flex-column justify-content-center align-items-center">
    //     <img height="5%" src={sscLogo} />
    //   </div>
    // </div>

    <Parallax bgImage={parallaxIMG} strength={200} className="parallax-container" bgImageStyle={{top: "-20%"}}>
        <div class="parallax-container d-flex flex-column justify-content-center align-items-center">
         <img height="7%" src={sscLogo} />
      </div>
    </Parallax>
  );
}
