import React, { useEffect } from "react";
import { Parallax } from 'react-parallax';

// import images
// import parallaxIMG from "../assets/images/multicolor-laptop.jpg";
import parallaxIMG from "../assets/images/alternate-laptop.jpeg";

export const Jumbotron = ({title, height, children}) => {
  return (
    <Parallax bgImage={parallaxIMG} strength={200} className="parallax-container" bgImageStyle={{top: "-20%"}} style={{height: height}}>
      <div className="title h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-5">{title}</h1>
        {children}
      </div>
    </Parallax>
  );
}
