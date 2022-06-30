import React from "react";
import "./../styles/tvScreen.css";
import vidSrc from "./../images/omuna.mp4";

class tvScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCom: false,
    };
  }
  componentDidMount() {
    const buttToggle = document.getElementById("TvToggle");
    const vidPlay = document.getElementById("vidCont");
    const comments = document.getElementsByClassName("commmentsCont");
    alert(comments)

    // alert(vidPlay)

    document.addEventListener("click", (e) => {
      if (this.state.toggleCom == true) {
        if (!comments.contains(e.target)) {
          this.setState({
            toggleCom:true
          })
        }
      } else {
      }
    });
  }
  render() {
    return (
      <div class="mainCont" onMouseMove={() => {}}>
        <video id="vidCont" src={vidSrc} controls autoplay />
        <div
          id="TvToggle"
          onClick={() => {
            this.setState({ toggleCom: true });
          }}
        ></div>
        {this.state.toggleCom ? (
          <div class="commmentsCont">
            <div id="commNav">
              <div id="cancelBut">x</div>
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
