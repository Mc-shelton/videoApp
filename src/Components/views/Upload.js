import React, { useState } from "react";
import FileArrowDown from "./../images/FileArrowDown.png";
import "./../styles/Dashboard.css";
import "./../styles/Upload.css";

import axios from "axios";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Topic: "",
      Title: "",
      Label: "",
      Descript: "",
      File: "",
      progress:''
    };
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
      console.log(this.state.File);
      let formData = new FormData();
      formData.append("file", this.state.File);
      formData.append("Topic", this.state.Topic);
      formData.append("Label", this.state.Label);
      formData.append("Title", this.state.Title);
      formData.append("Descript", this.state.Descript);
      axios({
        url: "https://dawn-aviation.com/static/php/upload.php",
        method: "POST",
        data: formData,
        onUploadProgress: (ProgressEvent) => {
          this.setState({progress:Math.round((ProgressEvent.loaded / this.state.File.size) * 100)});
        },
      })
        .then((Response) => {
          console.log("waiting..");
          console.log(Response);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  render() {
    // const data = new FormData()
    // console.log(data)
    return (
      <div id="bigDash">
        <h3>Upload Video</h3>
        <div id="uploadform">
            <div>{this.state.progress}</div>
          <form action="#" method="POST">
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
              value={this.state.Label}
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
              <p>Click to Upload</p>
            </label>
            <input
              id="inFile"
              type="file"
              style={{ display: "none" }}
              // accept="video/*"
              onChange={(e) => {
                this.setState({ File: e.target.files[0] });
              }}
            />
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
