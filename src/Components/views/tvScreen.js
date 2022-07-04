import React from "react";
import "./../styles/tvScreen.css";
import vidSrc from "./../images/omuna.mp4";
import axios from "axios";
import FlatList from "flatlist-react";

class tvScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCom: false,
      actContList: 'none',
      actVidList: 'block',
      actComm: 'none',
      vidList:[],
      comments:[],
      color:'blue',
      contact:[]
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
      this.setState({
        vidList:response.data
      })
    }).catch((err)=>{
      console.log(err)
    })

    // write getting time funciton here on the tab
    // get the list then get time, then compare with current time, then start playing with current time
    //the php should not take time as input, but generate a calculation for time

    let CurTime = new Date().getTime()
    let vidTime = new Date('01/12/2022')


    console.log('vid time',vidTime.getDate())
    console.log('curent time',CurTime)
     
  }

  renderContlist(){
    return(
      <div>this is the contact list</div>
    )
  }
  renderVidList(item, ind){
    return(
      <video src={item['Link']} onMouseOver={(e)=>{
        e.target.play()
      }}
      onMouseLeave={(e)=>{
        e.target.pause()
      }} muted/>
    )
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
              <div id="lbutt"></div>
              <div id="sbutt"></div>
            </div>
            <p id="AddButt">+Add</p>

            <div id="actContact" style={{display:this.state.actContList}}>
              <FlatList
              data={this.state.contact}
              renderWhenEmpty={()=>{return(<div>nothing here</div>)}}
              />
            </div>

            <div id="actVidList" style={{display:this.state.actVidList}}>
              <FlatList
              id="VidFlatList"
              inverted   
              list={this.state.vidList}
              renderItem={this.renderVidList}
              renderWhenEmpty={()=>{return(<div>nothing here</div>)}}
              />
            </div>
            <div id="ActComments" style={{display:this.state.actComm}}>
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
