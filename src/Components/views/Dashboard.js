import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/Dashboard.css";
import Flatlist from "flatlist-react";
// import {Player} from 'video-react'
// import ReactPlayer from 'react-player'
import src from "./../images/omuna.mp4";
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import axios from "axios";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bigHeight, setBigHeight] = useState();
  const [videos, setVideos] = useState('');
  const [loader, setLoader] = useState(true);
  const [veryinit, setVeryinit] = useState();
  
  const handMouse = () => {
    this.play();
  };
  // const src = 'https://dawn-aviation.com/Static/php/Uploads/files/testLink.mp4'
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

    // axios({
    // url:'https://dawn-aviation.com/static/php/download.php',
    // }).then((Res)=>{
    //   setVideos(Res.data)
    //   setLoader(false)
    // }).catch((err)=>{
    // })
    if(videos == ''){
      setLoader(true)
    }else{
      setLoader(false)
    }
  });
  const search = (value)=>{
    let items = veryinit
    let text = value.toLowerCase()

    let filteredName = items.filter((item)=>{
      // console.log(item.)
      return item.videoName.toLowerCase().match(text)
    })
    if(!text || text === '' || text == ' '){
      console.log('first')
      setVideos(veryinit)
      
    }
      else if(!filteredName.length){
      console.log(filteredName)
      setVideos([])
      }
      else{
      console.log('third')
      setVideos(filteredName)
      }
      filteredName = veryinit
      console.log(filteredName)
      console.log('changed')
  }
  var change;
  useEffect(()=>{

  fetch('https://dawn-aviation.com/static/php/download.php')
  .then((response)=>response.json())
  .then((responseJson)=>{
    console.log(responseJson)
    setVideos(responseJson)
    setVeryinit(responseJson)
})
  .catch((error) => {
    change = error;
    console.log(change)
  });
  },[change])

  const renderVideos = (vid,ind) => {
    return (
        <Link to={{ 
            pathname:'/watchVid',
            state:{vidList:videos,veryList:veryinit,vidPlay:ind}
        }}>
      <div class="vidBox" key={ind}>
        <h5>{vid['Label']}</h5>
        <div>
          <h4>{vid['Topic']}</h4>
        </div>
        <div class="detailBox">
          <h5>{vid['videoName']}</h5>
          <p>{vid['videoDescription']}</p>
          <video
            class="handBox"
            onMouseOver={() => {
              var handBox = document.getElementsByClassName("handBox");
              handBox[ind].play();
            }}
            onMouseLeave ={()=>{
                var handBox = document.getElementsByClassName('handBox')
                handBox[ind].pause()
                // handBox[ind].currentTime = 0;
            }}
            disablePictureInPicture
            muted
            src={vid['Link']}
            poster={vid['ThumbNail']}
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
          <input id="searchInput" type="text" onChange={(e)=>{
            search(e.target.value)
          }} placeholder="Search here" />
        </div>
        <h3>Recently Added</h3>
        <div id="bigRenderBox" style={{ maxHeight: `${bigHeight}px` }}>
        {loader?<div class ='loader'></div>:<></>}
          <Flatlist
            key={(vid)=>{vid.videoId.toString()}}
            list={videos}
            renderItem={renderVideos}
            renderWhenEmpty={() => <p style={{textAlign:'center'}}>fetching videos</p>}

            // sortBy = {}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard
