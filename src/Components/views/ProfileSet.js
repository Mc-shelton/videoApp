import React from "react";
import "./../styles/profileSet.css";
import dropfile from "./../images/FileArrowDown.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ProfileSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: "",
      profImageUpload: "",
      userData: "",
      loader:'',
      prev:dropfile
    };
  }

  async componentDidMount() {
    let gotData = await AsyncStorage.getItem("userData");
    gotData = JSON.parse(gotData);
    this.setState({
      userData: gotData,
    });
  }
  profSubmit = (e) => {
    e.target.disabled = true;
    this.setState({loader:'loading...'})
    if (this.state.profImageUpload != "") {
      let formData = new FormData();
      formData.append("profPic", this.state.profImageUpload);
      formData.append("Email", this.state.userData["Email"]);
      formData.append("Pass", this.state.userData["pwd"]);

      axios({
        url: "https://dawn-aviation.com/static/php/profPic.php",
        method: "POST",
        data: formData,
      }).then(async (res) => {
        if (typeof res.data != "string") {
          this.state.userData.profPic = res.data["url"];
          let jsonUser = JSON.stringify(this.state.userData)
          await AsyncStorage.setItem("userData",jsonUser);
          e.target.disabled = false;
          alert("Pic Updated succssfully");
          window.location.reload();
        } else {
          alert(res.data);
          e.target.disabled = false;
        }
      });
    } else {
      alert("you did not pic any image");
    }
  };

  render() {
    return (
      <div id="bigProfile">
        <div>
          <label>change profile picture?</label>
          <form>
            <label id="labelForImage" for="profImageId">
              <p>Click to choose image :</p>
              <img src={this.state.prev} alt="upload image" />
            </label>
            <input
              accept="image/*"
              onChange={(e) => {
                this.setState({ profImageUpload: e.target.files[0] });
                this.setState({prev:URL.createObjectURL(e.target.files[0])})
              }}
              style={{ display: "none" }}
              type="file"
              id="profImageId"
              name="profImage"
            />
            <button id="profButt" type="button" onClick={this.profSubmit}>
              submit
            </button>
            <p>{this.state.loader}</p>
          </form>
        </div>
      </div>
    );
  }
}
export default ProfileSet;
