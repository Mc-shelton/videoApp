import React from "react";
import "./../styles/tvScreen.css";
import vidSrc from "./../images/omuna.mp4";
import axios from "axios";

class tvScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCom: false,
    };
  }
  componentDidMount() {
    // alert('if no sound, Click unmute to play')
    let buttToggle = document.getElementById("TvToggle");
    let vidPlay = document.getElementById("vidCont");
    var comments =document.getElementsByClassName("commmentsCont");
    // console.log(comments)

    // alert(vidPlay)

    document.addEventListener("click", (e) => {
      if(!buttToggle.contains(e.target)){
      if(comments[0]!=undefined && !comments[0].contains(e.target)){
        this.setState({
          toggleCom:false
        })
      }}     
    });

    var timer = 0
    document.addEventListener('mousemove',()=>{
      timer = 0
    })
    document.addEventListener('keypress',()=>{
      timer = 0
    })
    document.addEventListener('clicked',()=>{
      timer = 0
    })
    var idleInterval = setInterval(() => {
      timer = timer +1;
      if(timer> 5){
        buttToggle.style.display = 'none'
      }else{
        buttToggle.style.display = 'block'
      }
    }, 400);


    axios({
      url:"https://dawn-aviation.com/static/php/getVidLink.php"
    }).then((response)=>{
      console.log(response)
    })
  }
  render() {
    return (
      <div class="mainCont" onMouseMove={() => {}}>
        <video id="vidCont" src={vidSrc} controls  autoPlay muted onEnded={(e)=>{
          // alert('good')
          e.target.src=vidSrc
        }}/>
        <div
          id="TvToggle"
          onClick={() => {
            this.setState({ toggleCom: true });
          }}
        ></div>
        {this.state.toggleCom ? (
          <div class="commmentsCont">
            <div id="commNav">
              <div id="fbutt"></div>
              <div id="sbutt"></div>
            </div>
            <p id="AddButt">+Add</p>
            <div id="ActComments">
              <div id="bigCommentBox">
                <div class="readComm"></div>
                <div class="readComm"></div>
                <div class="readComm"></div>
                <div class="readComm"></div>
                <div class="readComm"></div>
              </div>
              <div id="ActContact"></div>
              <textarea id="enterText" placeholder="Type here to add comment" />
            </div>
            <div id="watching">
              <div id="ActWatch">
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default tvScreen;
