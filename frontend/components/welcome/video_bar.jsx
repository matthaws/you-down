import React from 'react';
import ReactDOM from 'react-dom';


class VideoBar extends React.Component {

  render () {

    return (
  <div id="video-bar">
      <video id="videoBlock" preload="preload" autoPlay="autoplay" loop="loop">
        <source src={window.images.intro_video} type="video/mp4" />
      </video>
  </div>
  );
 }
}

export default VideoBar;
