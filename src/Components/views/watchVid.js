import React from "react";
import src from "./../images/omuna.mp4";
import Flatlist from "flatlist-react";
import { Link } from "react-router-dom";
import "./../styles/watchVid.css";

class watchVid extends React.Component {
  constructor(props) {
    super(props);
    var videos = props.location.state.vidList;
    var vidPlay = props.location.state.vidPlay;

    var maxheight = window.innerHeight;
    var wantedHeight = (85 * maxheight) / 100;
    var wantedHeight2 = (50 * maxheight) / 100;

    this.state = {
      videos: videos,
      vidPlay: vidPlay,
      height: wantedHeight,
      height2: wantedHeight2,
    };
    console.log(this.state.videos)
  }
  renderVideos = (vid,ind)=>{
      return(
      <div class='boxes' onClick={()=>{
        //   var vid= document.getElementById('bigVidDOM')
        //   vid.src = 'https://www.youtube.com/watch?v=B-pZ4q2WPQA'
          this.setState({vidPlay:ind})

      }}>
      <video
        class="handBox"
        onMouseOver={() => {
          var handBox = document.getElementsByClassName("handBox");
          console.log(handBox[ind])
          handBox[ind].play();
        }}
        onMouseLeave ={()=>{
            var handBox = document.getElementsByClassName('handBox')
            handBox[ind].pause()
            handBox[ind].currentTime = 0;
        }}
        disablePictureInPicture
        muted
        src={src}
      />
      <div class="vidDet">
          <h5>Title of Video</h5>
          <h5 style={{color:'grey'}}><i>label</i></h5>
          <p>Description of the video and more details on how its works</p>
          <h6>Marks : 80%</h6>
      </div>
      </div>
      )
  }
  render() {
    return (
      <div id="bigPlay" style={{ height: this.state.height }}>
        <div id="search">
          <input id="searchInput" type="text" placeholder="Search here" />
        </div>
        <div id="leftPlay">
          <video id='bigVidDOM' src={src} controls style={{ minHeight: this.state.height2 }} />
          <div id="comments">
            <h4>Title of video</h4>
            <h5>Label {this.state.vidPlay}</h5>
            <br />
            <h5>Tutor's remarks</h5>
            <h6>Tutor Name : Caleb Ongoti</h6>
            <h6>Tutor's rating : 80%</h6>
            <p>This is a remark by the tutor in charge</p>
          </div>
        </div>
        <div id="rightList" >
          <Flatlist
            list={this.state.videos}
            renderItem={this.renderVideos}
            renderWhenEmpty={() => <div>You have not added any video</div>}
            // sortBy = {}
          />
        </div>
      </div>
    );
  }
}

export default watchVid;
