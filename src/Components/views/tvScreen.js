import React from "react";
import "./../styles/tvScreen.css";
import vidSrc from "./../images/omuna.mp4";

class tvScreen extends React.Component {
  render() {
    return (
      <div class="mainCont">
        <video id="vidCont" src={vidSrc} controls />
        <div class="commmentsCont">
            <div id="commNav">
              <div id="fbutt"></div>
              <div id="sbutt"></div>
            </div>
            <div id="ActComments">
                <div id="bigCommentBox">
              <div id="readComm"></div>
              <div id="readComm"></div>
              <div id="readComm"></div>
              <div id="readComm"></div>
              <div id="readComm"></div>
              <input id="enterText"/>
            </div></div>
            <div id="watching">
              <div id="ActWatch">
                <div></div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default tvScreen;
