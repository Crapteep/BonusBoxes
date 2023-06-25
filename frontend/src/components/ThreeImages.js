import React from 'react';
import '../ThreeImages.css';

const ThreeImages = ( {box, megaBox, gigaBox} ) => {
  return (
    <div className="container-images">
      <img src={box} alt="box" />
      <img src={megaBox} alt="megabox" />
      <img src={gigaBox} alt="gigabox" />
    </div>
  );
};

export default ThreeImages;
