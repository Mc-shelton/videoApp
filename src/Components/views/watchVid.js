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
    var vidList = props.location.state.veryList;

    var maxheight = window.innerHeight;
    var wantedHeight = (85 * maxheight) / 100;
    var wantedHeight2 = (50 * maxheight) / 100;

    this.state = {
      videos: vidList,
      initial: videos,
      vidPlay: vidPlay,
      veryinit:vidList,
      height: wantedHeight,
      height2: wantedHeight2,
    };
    // console.log('what',this.state.v[0]['Label'])
    // this.setState({})
  }
  renderVideos = (vid,ind)=>{
      return(
      <div class='boxes' onClick={()=>{
        //   var vid= document.getElementById('bigVidDOM')
        //   vid.src = 'https://www.youtube.com/watch?v=B-pZ4q2WPQA'
          this.setState({vidPlay:ind})
          this.setState({initial:this.state.videos})
          this.setState({videos:this.state.veryinit})
          window.scrollTo({
            top:0,
            behavior:'smooth'
          })

      }}>
      <video
        class="handBox"
        onMouseOver={() => {
          var handBox = document.getElementsByClassName("handBox");
          // console.log(handBox[ind])
          handBox[ind].play();
        }}
        onMouseLeave ={()=>{
            var handBox = document.getElementsByClassName('handBox')
            handBox[ind].currentTime = 0;
            handBox[ind].pause()
        }}
        disablePictureInPicture
        muted
        poster={vid['ThumbNail']}
        src={vid['Link']}
      />
      <div class="vidDet">
          <h5>{vid['videoName']}</h5>
          <h5 style={{color:'grey'}}><i>{vid['Label']}</i></h5>
          <p>{vid['videoDescription']}</p>
          <h6>Marks : 80%</h6>
      </div>
      </div>
      )
  }
  search = (value)=>{
    // alert(value)
    let items = this.state.videos
    let text = value.toLowerCase()

    let filteredName = items.filter((item)=>{
      // console.log(item.)
      return item.videoName.toLowerCase().match(text)
    })
    if(!text || text === '' || text == ' '){
      console.log('first')
      this.setState({
        videos:this.state.veryinit
      })
      
    }
      else if(!filteredName.length){
      console.log(filteredName)
      this.setState({
        videos:[]
       })
      }
      else{
      console.log('third')
      this.setState({
          videos:filteredName
        })
      }
  }
  render() {
    return (
      <div id="bigPlay" style={{ height: this.state.height }}>
        <div id="search">
          <input id="searchInput" type="text" onChange={(e)=>{
            this.search(e.target.value)
          }} placeholder="Search here" />
        </div>
        <div id="leftPlay">
          <video id='bigVidDOM'autoPlay poster={this.state.initial[this.state.vidPlay]['ThumbNail']} posterSize='cover' src={this.state.initial[this.state.vidPlay]['Link']} controls style={{ minHeight: this.state.height2 }} />
          <div id="comments">
            <h4>{this.state.initial[this.state.vidPlay]['videoName']}</h4>
            <h5>{this.state.initial[this.state.vidPlay]['Label']}</h5>
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
