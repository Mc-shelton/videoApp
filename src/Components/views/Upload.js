import React, { useState } from "react";
import FileArrowDown from "./../images/FileArrowDown.png";
import "./../styles/Dashboard.css";
import "./../styles/Upload.css";

import axios from "axios";
import { upload } from "@testing-library/user-event/dist/upload";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Topic: "",
      Title: "",
      Label: "",
      Descript: "",
      File: "",
      ThumbNail: "",
      uploading:false,
      progress:'0',
      showName:false,
      mxHeight:'60px',
      Name:'',
      lowerWidth:'0%'
    };
  }
  componentDidMount(){
    let ht = window.innerHeight
    let mxht = (70*ht)/100
    mxht = `${mxht}px`

    this.setState({mxHeight:mxht})


  }
  onSubmit = async () => {
    if (
      this.state.Topic == "" ||
      this.state.Title == "" ||
      this.state.Label == "" ||
      this.state.Descript == ""
    ) {
      alert("Please Fill The Blank Spaces");
    } else {
      console.log(this.state.ThumbNail);
      let formData = new FormData();
      formData.append("file", this.state.File);
      formData.append("Topic", this.state.Topic);
      formData.append("Label", this.state.Label);
      formData.append("Title", this.state.Title);
      formData.append("ThumbNail", this.state.ThumbNail);
      formData.append("Descript", this.state.Descript);
      axios({
        url: "https://dawn-aviation.com/static/php/upload.php",
        method: "POST",
        data: formData,
        onUploadProgress: (ProgressEvent) => {
          this.setState({progress:Math.round((ProgressEvent.loaded / (this.state.File.size + this.state.ThumbNail.size)) * 100)});
          this.setState({lowerWidth:`${this.state.progress}%`})
          this.setState({uploading:true})
          while(this.state.progress>100){
            this.setState({progress:100})
          }
        },
      })
        .then((Response) => {
          this.setState({uploading:false})
          this.setState({progress:'0'})
          this.setState({lowerWidth:'0%'})
          alert(Response.data)
        })
        .catch((err) => {
          this.setState({uploading:false})
          this.setState({progress:'0'})
          this.setState({lowerWidth:'0%'})
          alert(err);
        });
    }
  };
  render() {
    // const datat = new FormData()
    // console.log(data)
    return (
      <div id="bigDash">
        <h3>Upload Video</h3>
        <div id="uploadform"  style={{height:this.state.mxHeight}}>
          {this.state.uploading?<div id='uploading'>
            <div class ='loader'></div>
            <h5 style={{marginTop:'10px'}}>{this.state.progress}%</h5>
            <div class='lower'>
              <div class='lowerBack' style={{width:this.state.lowerWidth}}></div>
            </div>
          </div>:<></>}
          <form action="#" method="POST" enctype="multipart/form-data">
            <input
              type="text"
              placeholder="Topic of Study"
              value={this.state.Topic}
              onChange={(e) => {
                this.setState({ Topic: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Title"
              value={this.state.Title}
              onChange={(e) => {
                this.setState({ Title: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Label"
              value={this.state.Label}state
              onChange={(e) => {
                this.setState({ Label: e.target.value });
              }}
            />
            <textarea
              type="text"
              placeholder="Short Description"
              value={this.state.Descript}
              onChange={(e) => {
                this.setState({ Descript: e.target.value });
              }}
            />
   <label id="fileLabel" for="inFile">
              <img src={FileArrowDown} />
              <p>Click to Upload ThumbNail</p>
            </label>
            <input
              id="inFile"
              type="file"
              accept="images/*"
              name="file"
              style={{ display: "none" }}
              onChange={(e) => {
                this.setState({ ThumbNail: e.target.files[0] });
              }}
            />
            <label id="forInVid" for='inVid'><p>Click to Upload Video</p></label>
            <input 
            type='file'
            name="vid"
            id="inVid"
            accept="video/*"
            style={{display:'none'}}
            onChange={(e)=>{

              this.setState({ File: e.target.files[0] });
              this.setState({showName:true})
            }}/>
            {this.state.showName?<div style={{marginTop:'5px',fontSize:'11px'}}>You Selected: <br/>{this.state.File.name}asdf</div>:<></>}
            <button type="button" onClick={this.onSubmit}>
              submit
            </button>
          </form>
        </div>
      </div>
 );
  }
}

export default Upload;
