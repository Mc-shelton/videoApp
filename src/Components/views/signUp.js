import React from "react";
import { Link } from "react-router-dom";
import user from "./../images/User.png";
// import google from './../images/google logo.png'
import lock from "./../images/Private Lock.png";
import mail from "./../images/Secured Letter.png";
import "./../styles/signUp.css";

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
            <div class="inputBox"></div>
            <div class="inputBox">
              <label for="UserName">
                <img src={user} alt="" />
              </label>
              <input type="text" name="UserName" placeholder="User Name" />
            </div>
            <div class="inputBox">
              <label for="UserEmail">
                <img src={mail} alt="" />
              </label>
              <input type="email" name="UserEmail" placeholder="User Email" />
            </div>
            <div class="inputBox">
              <label for="passWord">
                <img src={lock} alt="" />
              </label>
              <input type="password" name="passWord" placeholder="Password" />
            </div>
            <div class="inputBox">
              <label for="ConPassWord">
                <img src={lock} alt="" />
              </label>
              <input
                type="password"
                name="ConPass"
                placeholder="Confirm Password"
              />
            </div>
            <div class="inputBox">
              <Link
                to={{
                  pathname: "/",
                  state: { token: true },
                }}
              >
                <button type="button" name="UserButt">
                  LogIn
                </button>
                <br />
                <br />
              </Link>
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
