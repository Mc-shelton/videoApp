import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./../styles/signIn.css";
import google from "./../images/google logo.png";
import lock from "./../images/Private Lock.png";
import user from "./../images/User.png";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    if(window.innerWidth<600){
      var toggleNav = false
    }else{
      var toggleNav = true
    }
    this.state = {
      isLoggedin: true,
      toggleNav: toggleNav,
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
              <div class="inputBox"></div>
              <div class="inputBox">
                <label for="UserEmail">
                  <img src={user} alt="" />
                </label>
                <input type="text" name="UserEmail" placeholder="User Email" />
              </div>
              <div class="inputBox">
                <label for="passWord">
                  <img src={lock} alt="" />
                </label>
                <input type="password" name="passWord" placeholder="Password" />
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
                </Link>
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
