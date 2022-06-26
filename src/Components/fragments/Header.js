import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

import bell from "./../images/bell.svg";
import plus from "./../images/add-one.png";
import drop from "./../images/down-one.png";
import avator from "./../images/pp.jfif";
import axios from "axios";
import FlatList from "flatlist-react";
import AsyncStorage from "@react-native-async-storage/async-storage";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Notify: false,                       
      dropSign: false,
      Messages: "",
      userData:'',
      picSrc:avator
    };
  }
  async componentDidMount() {
    // alert()
    axios({
      url: "https://dawn-aviation.com/static/php/notification.php",
    })
      .then((response) => {
        // alert('got the data')
        this.setState({ Messages: response.data });
        console.log(this.state.Messages);
      })
      .catch((err) => {
        alert(err);
      });
      var useData = await AsyncStorage.getItem('userData')
      useData = JSON.parse(useData)
      console.log('header',useData,'eands')
      this.setState({userData:useData})
      this.setState({picSrc:useData['profPic']})
    }
  renderMessages(message) {
    return (
      <div>
        <div class="notContent">
          <h6>{message['Sender']}</h6>
          <p class="date">{message['Date']}</p>
          <p class="content">{message['Message']}</p>
        </div>
        <hr />
      </div>
    );
  }
  render() {
    return (
      <header id="header1">
        <div id="logo" class="hand"></div>
        <img
          src={bell}
          id="bell"
          class="hand"
          alt="bell"
          onClick={() => {
            if (this.state.Notify == true) {
              this.setState({ Notify: false });
            } else {
              this.setState({ Notify: true });
              this.setState({ dropSign: false });
            }
          }}
        />
        <div
          id="dropDwn"
          class="hand"
          onClick={() => {
            if (this.state.dropSign == true) {
              this.setState({ dropSign: false });
            } else {
              this.setState({ Notify: false });
              this.setState({ dropSign: true });
            }
          }}
        >
          <img src={plus} alt="plus" id="plus" />
          <img src={drop} alt="drop" id="drop" />
        </div>
        <div id="avator" style={{border:'2px solid red',background:`url(${this.state.picSrc})`,backgroundSize:'cover',backgroundPositionX:'0 0'}} class="hand">
          <img src={this.state.picSrc} />
        </div>
        {this.state.Notify ? (
          <div id="notification">
            <h5>Notifications</h5>
            <div id="flatlist">
              <FlatList
                list={this.state.Messages}
                renderItem={this.renderMessages}
                renderWhenEmpty={()=><p>loading...</p>}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {this.state.dropSign ? (
          <div id="dropSign">
            <p>You signed in as</p>
            <h5>{this.state.userData['Name']}</h5>
            <Link to="/ProfileSet">
              <div class="link">Set Profile Pic</div>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </header>
    );
  }
}
export default Header;
