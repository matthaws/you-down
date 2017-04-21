import React from 'react';
import ReactDOM from 'react-dom';


class VideoBar extends React.Component {

  render () {

    return (
  <div id="video-bar">
    <div id="videoBlock">
      <video preload="preload" width="1920" autoPlay="autoplay" loop="loop">
        <source src={window.images.intro_video} type="video/mp4" />
      </video>
    </div>
  </div>
  );
 }
}

export default VideoBar;
