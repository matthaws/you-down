import React from "react";
import IntroVideo from "../../packs/videos/YouDownIntro.mp4";
import "./video_bar.css";

const VideoBar = () => (
  <div id="video-bar">
    <video id="videoBlock" preload="preload" autoPlay="autoplay" loop="loop">
      <source src={IntroVideo} type="video/mp4" />
    </video>
  </div>
);

export default VideoBar;
