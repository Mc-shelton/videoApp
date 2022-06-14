import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./../styles/signIn.css";
import google from "./../images/google logo.png";
import lock from "./../images/Private Lock.png";
import user from "./../images/User.png";
import axios from "axios";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    if (window.innerWidth < 600) {
      var toggleNav = false;
    } else {
      var toggleNav = true;
    }
    this.state = {
      isLoggedin: false,
      toggleNav: toggleNav,
      Email: "",
      Password: "",
      LogState: "",
    };
  }
  componentDidMount() {
    var body = document.getElementsByClassName("body");
    var maxheight = window.innerHeight;
    var wantedHeight = (100 * maxheight) / 100;
    body[0].style.height = `${wantedHeight}px`;

    var nav = document.getElementById("nav");
  }
  toggleAct = () => {
    if (this.state.toggleNav == true && window.innerWidth < 600) {
      this.setState({ toggleNav: false });
    } else {
      this.setState({ toggleNav: true });
    }
  };
  submitLogin = () => {
    if (this.state.Email == "" || this.state.Password == "") {
      this.setState({ LogState: "You left some fields empty" });
    } else {
      this.setState({ LogState: "Loading..." });
      var butLog = document.getElementById("buttLog");
      butLog.disabled = true;
      axios
        .post(
          "https://dawn-aviation.com/static/php/signIn.php",
          JSON.stringify({
            Email: this.state.Email,
            Password: this.state.Password,
          })
        )
        .then((Response) => {
          var feedBack = Response.data;
          if (feedBack != "") {
            this.setState({ LogState: "success... redirecting..." });
            var butLog = document.getElementById("buttLog");
            butLog.disabled = false;

            this.props.history.push({
              pathname: "/",
              state: { token: true, userData: feedBack, showNav: true },
            });
          } else {
            this.setState({ LogState: "Login Failed Try again" });
            var butLog = document.getElementById("buttLog");
            butLog.disabled = false;
          }
        })
        .catch((err) => {
          this.setState({ LogState: "You are offline  " });
          var butLog = document.getElementById("buttLog");
          butLog.disabled = false;
        });
    }
  };
  render() {
    return (
      <React.Fragment>
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
            <form action="./../../backEnd/php/signIn.php" method="POST">
              <div class="inputBox">{this.state.LogState}</div>
              <div class="inputBox">
                <label for="UserEmail">
                  <img src={user} alt="" />
                </label>
                <input
                  type="text"
                  name="UserEmail"
                  placeholder="User Email"
                  onChange={(e) => {
                    this.setState({ Email: e.target.value });
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div class="inputBox">
                <label for="passWord">
                  <img src={lock} alt="" />
                </label>
                <input
                  type="password"
                  name="passWord"
                  placeholder="Password"
                  onChange={(e) => {
                    this.setState({ Password: e.target.value });
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div class="inputBox">
                <button type="button" id="buttLog" onClick={this.submitLogin}>
                  LogIn
                </button>
                <br />
                <br />
              </div>

              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginLeft: "-80px",
                }}
              >
                <Link to="#">Forgot Password?</Link>
              </p>
            </form>
          </div>

          <div id="SignOut">
            <fieldset>
              <legend>Or SignUp with</legend>
              <div id="BoxGoogle">
                <img src={google} alt="" />
                <p>Google</p>
              </div>
              <p>
                Or
                <span>
                  <Link
                    to={{
                      pathname: "/signUp",
                    }}
                    class="Link"
                  >
                    {" "}
                    Create Account
                  </Link>
                </span>
              </p>
            </fieldset>
          </div>
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
      </React.Fragment>
    );
  }
}
export default SignIn;
// Username: dawnavi2
// Password: *DBexZ07bEw6#7
