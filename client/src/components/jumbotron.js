import React, { useEffect } from "react";
import { Parallax } from 'react-parallax';

// import images
import parallaxIMG from "../assets/images/multicolor-laptop.jpg";
import nuurdLogo from "../assets/images/nuurd_orange.png";

export const Jumbotron = ({children}) => {
  return (
    <Parallax bgImage={parallaxIMG} strength={200} className="parallax-container" bgImageStyle={{top: "-20%"}}>
      <div class="d-flex flex-column justify-content-center align-items-center">
         {/* <img height="7%" src={nuurdLogo} /> */}
      </div>
      {children}
    </Parallax>
  );
}
