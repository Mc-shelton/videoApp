import React from "react";
import { Link } from "react-router-dom";
import user from "./../images/User.png";
// import google from './../images/google logo.png'
import lock from "./../images/Private Lock.png";
import mail from "./../images/Secured Letter.png";
import "./../styles/signUp.css";

import axios from "axios"
class signUp extends React.Component {
  constructor(props) {
    super(props);
    if (window.innerWidth < 600) {
      var toggleNav = false;
    } else {
      var toggleNav = true;
    }
    this.state = {
      token: true,
      toggleNav: toggleNav,
      Email:'',
      Password:'',
      UserName:'',
      Password2:'',
      LogState:''
    };
  }

  componentDidMount() {
    var body = document.getElementsByClassName("body");
    var maxheight = window.innerHeight;
    var wantedHeight = (100 * maxheight) / 100;
    body[0].style.height = `${wantedHeight}px`;

    var dropMen = document.getElementById("dropMen");
    dropMen = () => {
      alert();
    };
  }
  toggleAct = () => {
    if (this.state.toggleNav == true && window.innerWidth < 600) {
      this.setState({ toggleNav: false });
    } else {
      this.setState({ toggleNav: true });
    }
  };
  submitLogin = () => {
    if (this.state.Email == "" || this.state.Password == "" || this.state.UserName == "") {
      this.setState({ LogState: "You left some fields empty" });
      
    } else {
      if(this.state.Password != this.state.Password2){
        this.setState({LogState:"Passwords din't match"})
      }else{
        this.setState({ LogState: "Loading..." });
        var butLog = document.getElementById("buttLog");
        butLog.disabled = true;
        axios
          .post(
            "https://dawn-aviation.com/static/php/singUp.php",
            JSON.stringify({
              Email: this.state.Email,
              Password: this.state.Password,
              UserName: this.state.UserName,
            })
          )
          .then((Response) => {
            var feedBack = Response.data;
            var feedJson
            if (feedBack != "Email already used" && feedBack != "" && typeof(feedBack)!='string') {
              this.setState({ LogState: "success... redirecting..." });
              var butLog = document.getElementById("buttLog");
              butLog.disabled = false;

            feedJson = (JSON.stringify(feedBack))

              this.props.history.push({
                pathname: "/",
                state: { token: true, userData: feedJson, showNav: true },
              });
            } else {
              this.setState({ LogState: feedBack });
              var butLog = document.getElementById("buttLog");
              butLog.disabled = false;
            }
          })
          .catch((err) => {
            this.setState({ LogState: "You are offline  " });
            var butLog = document.getElementById("buttLog");
            butLog.disabled = false;
          });}
    }}
  render() {
    return (
      <div class="body">
        <div id="header">
          <div id="logo"></div>
          <div id="dropMen" onClick={this.toggleAct}></div>

          {this.state.toggleNav ? (
            <div id="nav">
              <ul>
                <li>
                  <Link to="#"></Link>Home
                </li>
                <li>
                  <Link to="#"></Link>About
                </li>
                <li>
                  <Link to="#"></Link>Contact
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div id="SignIn">
          <form action="./../../backEnd/php/LogRes.php" method="POST">
              <div class="inputBox">{this.state.LogState}</div>
            <div class="inputBox">
              <label for="UserName">
                <img src={user} alt="" />
              </label>
              <input type="text" name="UserName"
                  onChange={(e) => {
                    this.setState({ UserName: e.target.value });
                    console.log(e.target.value);
                  }} placeholder="User Name" />
            </div>
            <div class="inputBox">
              <label for="UserEmail">
                <img src={mail} alt="" />
              </label>
              <input type="email" name="UserEmail" 
                  onChange={(e) => {
                    this.setState({ Email: e.target.value });
                    console.log(e.target.value);
                  }} placeholder="User Email" />
            </div>
            <div class="inputBox">
              <label for="passWord">
                <img src={lock} alt="" />
              </label>
              <input type="password" name="passWord" 
                  onChange={(e) => {
                    this.setState({ Password: e.target.value });
                    console.log(e.target.value);
                  }} placeholder="Password" />
            </div>
            <div class="inputBox">
              <label for="ConPassWord">
                <img src={lock} alt="" />
              </label>
              <input
                type="password"
                name="ConPass"
                placeholder="Confirm Password"
                  onChange={(e) => {
                    this.setState({ Password2: e.target.value });
                    console.log(e.target.value);
                  }}
              />
            </div>
            <div class="inputBox">
                <button type="button" name="UserButt" id='buttLog' onClick={this.submitLogin}>
                  LogIn
                </button>
                <br />
                <br />
            </div>
            <div class="inputBox">
              <Link
                to={{
                  pathname: "/SignIn",
                }}
                id="link"
              >
                Back to SignIn
              </Link>
            </div>
          </form>
        </div>

        {/* 
  <script>
    var BackRes = document.getElementById('backEndResponse')
    BackRes.style.background = 'white'
    if (BackRes.innerHTML != '') {
    }else{
      BackRes.style.display = 'none';

    }
  </script> */}
      </div>
    );
  }
}
export default signUp;
