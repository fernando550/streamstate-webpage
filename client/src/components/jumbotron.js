import React, { useEffect } from "react";
import { Parallax } from 'react-parallax';

// import images
// import parallaxIMG from "../assets/images/multicolor-laptop.jpg";
import parallaxIMG from "../assets/images/alternate-laptop.jpeg";
import nuurdLogo from "../assets/images/nuurd_orange.png";

export const Jumbotron = ({title}) => {
  return (
    <Parallax bgImage={parallaxIMG} strength={200} className="parallax-container" bgImageStyle={{top: "-20%"}}>
      <div className="title h-100 d-flex flex-column justify-content-center align-items-center">
        <h1>{title}</h1>
      </div>
    </Parallax>
  );
}
