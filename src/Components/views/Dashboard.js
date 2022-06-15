import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/Dashboard.css";
import Flatlist from "flatlist-react";

import ReactPlayer from 'react-player'
import src from "./../images/omuna.mp4";
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bigHeight, setBigHeight] = useState();
  const videos = [
    { title: "shelton1" },
    { title: "shelton2" },
    { title: "shelton3" },
    { title: "shelton4" },
    { title: "omondi" },
  ];
  const handMouse = () => {
    this.play();
  };
  useEffect(() => {
    var maxheight = window.innerHeight;
    var wantedHeight = (60 * maxheight) / 100;
    setBigHeight(wantedHeight);
    var handBox = [...document.getElementsByClassName("handBox")];

    // handBox.forEach(item => {
    //     item.addEventListener('mouseover',()=>{
    //         this.play()
    //     })
    // });
  });
  const renderVideos = (vid,ind) => {
    return (
        <Link to={{ 
            pathname:'/watchVid',
            state:{vidList:videos,vidPlay:ind}
        }}>
      <div class="vidBox" key={ind}>
        <h5>Label</h5>
        <div>
          <h4>TOPIC OF STUDY</h4>
        </div>
        <div class="detailBox">
          <h5>Title of Vid</h5>
          <p>A lot of description</p>
          <ReactPlayer
            class="handBox"
            onMouseOver={() => {
              var handBox = document.getElementsByClassName("handBox");
              handBox[ind].playing = true;
            }}
            onMouseLeave ={()=>{
                var handBox = document.getElementsByClassName('handBox')
                handBox[ind].playing = true
                handBox[ind].currentTime = 0;
            }}
            disablePictureInPicture
            muted
            url='https://dawn-aviation.com/Static/php/Uploads/files/testLink.mp4'
          />
        </div>
      </div>
      </Link>
    );
  };
  return (
    <React.Fragment>
      <div id="bigDash">
        <div id="search">
          <input id="searchInput" type="text" placeholder="Search here" />
        </div>
        <h3>Recently Added</h3>
        <div id="bigRenderBox" style={{ maxHeight: `${bigHeight}px` }}>
          <Flatlist
            list={videos}
            renderItem={renderVideos}
            renderWhenEmpty={() => <div>You have not added any video</div>}
            // sortBy = {}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
