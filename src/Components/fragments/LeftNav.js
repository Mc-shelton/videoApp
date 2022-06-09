import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./../images/Home Icon.png";
import LogOut from "./../images/Profile Icon.png";
import Plus from "./../images/Plus Icon.png";
import Search from "./../images/Search Icon.png";
import Likes from "./../images/Likes Icon.png";

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    // var nav = document.getElementsByClassName("nav");
    // nav[0].style.height = window.innerHeight - 75 + "px";
    var maxheight = window.innerHeight;
    var wantedHeight = (86.5 * maxheight) / 100;
    var currentLoc = window.location.pathname;
    this.state = {
      navHeight: wantedHeight,
      currentLoc: currentLoc,
    };
  }

  componentDidMount() {
    // this.onFocus()
  }
  componentDidUpdate() {
    var path = window.location.pathname;
    console.log(path)
    var Dash = document.getElementById("Dashboard");
    var Search = document.getElementById("Search");
    var Upload = document.getElementById("Upload");
    var Favorite = document.getElementById("Favorite");
    var LogOut = document.getElementById("LogOut");
    if (path == "/Dashboard") {
      // this.onFocus()
      Dash.classList.add("focus");
      Search.classList.remove("focus");
      Upload.classList.remove("focus");
      Favorite.classList.remove("focus");
      LogOut.classList.remove("focus");
      // Dash[0].style.border = '2px solid red'
    }
    if (path == "/Search") {
      // this.onFocus()
      Dash.classList.remove("focus");
      Search.classList.add("focus");
      Upload.classList.remove("focus");
      Favorite.classList.remove("focus");
      LogOut.classList.remove("focus");
    }
    if (path == "/Favorite") {
      // this.onFocus()
      Dash.classList.remove("focus");
      Search.classList.remove("focus");
      Upload.classList.remove("focus");
      Favorite.classList.add("focus");
      LogOut.classList.remove("focus");
    }
    if (path == "/Upload") {
      // this.onFocus()
      Dash.classList.remove("focus");
      Search.classList.remove("focus");
      Upload.classList.add("focus");
      LogOut.classList.remove("focus");
      Favorite.classList.remove("focus");
    }
    if (path == "/LogOut") {
      // this.onFocus()
      Dash.classList.remove("focus");
      Search.classList.remove("focus");
      Upload.classList.remove("focus");
      Favorite.classList.remove("focus");
      LogOut.classList.add("focus");
    }
  }
  expandMenu = () => {
    let navPar = document.getElementsByClassName("navPar");
    let bigLeft = document.getElementById("bigLeft");
    let MenuButt = document.getElementById("MenuButt");
    let nav = document.getElementsByClassName("nav");

    if (window.innerWidth < 600) {
      nav[0].style.left = "0";
    }
    // nav.addEventlistener
    let len = navPar.length;
    if (navPar[3].style.display != "block") {
      bigLeft.style.width = "5.4%";
      nav[0].style.width = "15%";
      nav[0].style.height = "86.5%";
      // nav[0].style.border = '2px solid red'
      MenuButt.style.marginLeft = "-69%";
      // nav[0].style.width = '100%'
      nav[0].style.position = "absolute";
      for (let i = 0; i < len; i++) {
        navPar[i].style.display = "block";
      }

      if (window.innerWidth < 600) {
        nav[0].style.minWidth = "45%";
        MenuButt.style.marginLeft = "-59%";
        nav[0].style.boxShadow = "rgba(5, 7, 8, 0.2) 0px 15px 24px";
      }
    } else {
      for (let i = 0; i < len; i++) {
        navPar[i].style.display = "none";
      }
      nav[0].style.display = "relative";
      nav[0].style.width = "";
      bigLeft.style.width = "5.4%";
      MenuButt.style.marginLeft = "-5%";

      if (window.innerWidth < 600) {
        nav[0].style.minWidth = "20%";
        nav[0].style.boxShadow = "none";
        // nav[0]
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ height: this.state.navHeight, float: "left", Width: "5%" }}
          id="bigLeft"
        >
          <nav class="nav">
            <div id="MenuButt" class="hand" onClick={this.expandMenu} />
            <div id="navLink">
              <div class="navBox" onClick={this.hideNav}>
                <Link
                  to={{
                    pathname: "/Upload",
                    state: {showNav: false,toggleB:true}
                  }}
                >
                  <div class="navImage" id="Upload">
                    <img src={Plus} />
                  </div>
                  <p class="navPar">Upload</p>
                </Link>
              </div>
              <div class="navBox" onClick={this.hideNav}>
                <Link
                  to={{
                    pathname: "/Search",
                    state: {showNav: false,toggleB:true}
                  }}>
                  <div class="navImage" id="Search">
                    <img src={Search} />
                  </div>
                  <p class="navPar">Search</p>
                </Link>
              </div>
              <div class="navBox" onClick={this.hideNav}>
                <Link 
                  to={{
                    pathname: "/",
                    state: {showNav: false,toggleB:true}
                  }}>
                  <div class="navImage focus" id="Dashboard">
                    <img src={Home} style={{ height: 30, width: 30 }} />
                  </div>
                  <p class="navPar">Dashboard</p>
                </Link>
              </div>
              <div class="navBox" onClick={this.hideNav}>
                <Link 
                  to={{
                    pathname: "/Favorite",
                    state: {showNav: false,toggleB:true}
                  }}>
                  <div class="navImage" id="Favorite">
                    <img src={Likes} />
                  </div>
                  <p class="navPar">Favorites</p>
                </Link>
              </div>
              <div class="navBox" onClick={this.hideNav}>
                <Link 
                  to={{
                    pathname: "/LogOut",
                    state: {showNav: false,toggleB:true}
                  }}>
                  <div class="navImage" id="LogOut">
                    <img src={LogOut} />
                  </div>
                  <p class="navPar">Log Out</p>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
export default LeftNav;
