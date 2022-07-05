import React from "react";
import "./../styles/tvScreen.css";
import vidSrc from "./../images/omuna.mp4";
import axios from "axios";
import FlatList from "flatlist-react";

var mainInd = 0;
class tvScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCom: false,
      actContList: "none",
      actVidList: "block",
      actComm: "none",
      vidList: [],
      comments: [],
      color: "blue",
      contact: [],
      TimeList: [],
      notSortTime: [],
      mainInd: 0,
      name: "",
      viDSrc: "",
    };
  }
  componentDidMount() {
    while (this.state.name == "") {
      console.log("no sense");
    }
  }
  componentDidMount() {
    // alert('if no sound, Click unmute to play')
    let buttToggle = document.getElementById("TvToggle");
    let vidPlay = document.getElementById("vidCont");
    var comments = document.getElementsByClassName("commmentsCont");
    // console.log(comments)

    // alert(vidPlay)

    document.addEventListener("click", (e) => {
      if (!buttToggle.contains(e.target)) {
        if (comments[0] != undefined && !comments[0].contains(e.target)) {
      e.preventDefault()
          this.setState({
            toggleCom: false,
          });
        }
      }
    });

    var timer = 0;
    document.addEventListener("mousemove", () => {
      timer = 0;
    });
    document.addEventListener("keypress", () => {
      timer = 0;
    });
    document.addEventListener("clicked", () => {
      timer = 0;
    });
    var idleInterval = setInterval(() => {
      timer = timer + 1;
      if (timer > 5) {
        buttToggle.style.display = "none";
      } else {
        buttToggle.style.display = "block";
      }
    }, 400);
    axios({
      url: "https://dawn-aviation.com/static/php/getVidLink.php",
    })
      .then((response) => {
        console.log(response);
        this.setState(
          {
            vidList: response.data,
          },
          this.playerPicker
        );

        response.data.forEach((e, i) => {
          this.state.TimeList.push(
            parseInt(new Date(e["uploadDate"]).valueOf())
          );
          this.state.notSortTime.push(
            parseInt(new Date(e["uploadDate"]).valueOf())
          );
        });
      })
      .then(() => {
        // this.playerPicker()
      })
      .catch((err) => {
        alert("Network Error");
      });
  }

  refresh = () => {
    axios({
      url: "https://dawn-aviation.com/static/php/getVidLink.php",
    })
      .then((response) => {
        if (response.data.length == this.state.vidList.length) {
          
        } else {
          this.setState(
            {
              vidList: response.data,
            },
          // this.playerPicker
          );
          response.data.forEach((e, i) => {
            this.state.TimeList.push(
              parseInt(new Date(e["uploadDate"]).valueOf())
            );
            this.state.notSortTime.push(
              parseInt(new Date(e["uploadDate"]).valueOf())
            );
          });
          // console.log("same data else", response.data.length);
          // console.log("same list else", this.state.vidList.length);
        }
      })
      .catch((err) => {
        console.log("Network Error");
      });
  };
  playerPicker = () => {
    console.log("not sort", this.state.notSortTime);
    console.log("vid List", this.state.vidList);
    console.log("time list", this.state.TimeList);

    // write getting time funciton here on the tab
    // get the list then get time, then compare with current time, then start playing with current time
    //the php should not take time as input, but                                                                                                 generate a calculation for time

    let CurTime = new Date().getTime();
    let textTime = CurTime + 100000;
    this.state.TimeList.sort((a, b) => b - a);

    let index = parseInt(CurTime.valueOf());
    var indNum;
    var indValue;
    var termInd;
    // this.state.TimeList.push(textTime);
    this.state.TimeList.every((list, ind) => {
      // let list = list
      if (list < index) {
        index = list;
        termInd = ind;
        console.log("index ", termInd);
        return true;
      } else {
        indNum = ind;
        console.log("indNum ", indNum);
        if (indNum != undefined) {
          // alert()
          indValue = this.state.TimeList[indNum];

          this.state.mainInd.push(
            this.state.notSortTime.indexOf(parseInt(indValue))
          );
          this.setState({
            mainInd:this.state.notSortTime.indexOf(parseInt(indValue)),
            viDSrc: this.state.vidList[this.state.notSortTime.indexOf(parseInt(indValue))]["Link"],
          });
        } else {
          alert("something went wrong");
        }

        return false;
      }
    });

    if (termInd + 1 == this.state.TimeList.length) {
      this.setState({
        viDSrc: this.state.vidList[this.state.vidList.length - 1]["Link"],
        mainInd: this.state.vidList.length -1
      });
      // alert('no new video available')
    }

    setInterval(this.refresh, 5000);
  };

  renderContlist() {
    return <div>this is the contact list</div>;
  }

  renderVidList = (item, ind) => {
    return (
      <video
        id="ActVid" // this.setState({
        //   mainInd:[0]
        // })
        src={item["Link"]}
        poster={item["ThumbNail"]}
        onMouseOver={(e) => {
          e.target.play();
        }}
        onMouseLeave={(e) => {
          e.target.pause();
        }}
        onClick={() => {
          this.setState({
            viDSrc: this.state.vidList[ind]["Link"],
            mainInd: ind,
          },()=>{
            alert(this.state.mainInd)
          });
          // alert(ind)
        }}
        muted
      />
    );
  };

  render() {
    return (
      <div class="mainCont" onMouseMove={() => {}}>
        {/* <p style={{height:200,color:'white'}}>hello{this.state.mainInd[0]}</p> */}
        <video
          id="vidCont"
          src={this.state.viDSrc}
          controls
          autoPlay
          muted
          // allowfulscreen

          onEnded={(e) => {
            if(this.state.mainInd == this.state.vidList.length-1){
            
              alert('equal', this.state.vidList.length, this. state.mainInd)
              e.target.currentTime = 0
              e.target.play()
            
          }else{
            this.setState({
              mainInd: this.state.mainInd +1,
            },()=>{
              this.setState({
                viDSrc:this.state.vidList[parseInt(this.state.mainInd)]['Link']
              })
            });
          e.target.play()
          }
            
          }}
          onMouseOver={() => {
            // console.log('last',this.state.vidList[0]['Link'])
          }}
        />
        <div
          id="TvToggle"
          onClick={() => {
            this.setState({ toggleCom: true });
          }}
        ></div>
        {this.state.toggleCom ? (
          <div class="commmentsCont">
            <div id="commNav">
              <div
                id="fbutt"
                onClick={() => {
                  this.setState({
                    actContList: "block",
                    actVidList: "none",
                    actComm: "none",
                  });
                }}
              ></div>
              <div
                id="lbutt"
                onClick={() => {
                  this.setState({
                    actContList: "none",
                    actVidList: "block",
                    actComm: "none",
                  });
                }}
              ></div>
              <div
                id="sbutt"
                onClick={() => {
                  this.setState({
                    actContList: "none",
                    actVidList: "none",
                    actComm: "block",
                  });
                }}
              ></div>
            </div>
            <p id="AddButt">+Add</p>

            <div id="actContact" style={{ display: this.state.actContList }}>
              <h5>Help Center</h5>
              <div id="Help">
                <div id="avatorTv"></div>
                <h4>Phone</h4>
                <p>072090290</p>
                <h4>Email</h4>
                <p>example@gmail.com</p>
              </div>
            </div>

            <div id="actVidList" style={{ display: this.state.actVidList }}>
              <FlatList
                id="VidFlatList"
                inverted
                list={this.state.vidList}
                renderItem={this.renderVidList}
                renderWhenEmpty={() => {
                  return (
                    <div id="nothing">
                      <p>no video available here</p>
                    </div>
                  );
                }}
              />
            </div>
            <div id="ActComments" style={{ display: this.state.actComm }}>
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
