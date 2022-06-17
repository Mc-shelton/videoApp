import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

import bell from "./../images/bell.svg";
import plus from "./../images/add-one.png";
import drop from "./../images/down-one.png";
import avator from "./../images/pp.jfif";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Notify: false,
      dropSign: false,
    };
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
              this.setState({dropSign:false})
            }
          }}
        />
        <div id="dropDwn" class="hand" onClick={()=>{
          if(this.state.dropSign == true){
            this.setState({dropSign:false})
          }else{
            this.setState({Notify:false})
            this.setState({dropSign:true})
          }
        }}>
          <img src={plus} alt="plus" id="plus" />
          <img src={drop} alt="drop" id="drop" />
        </div>
        <div id="avator" class="hand">
          <img src={avator} />
        </div>
        {this.state.Notify ? (
          <div id="notification">
            <h5>Notifications</h5>
            <div id="flatlist">
              <div class="notContent">
                <h6>Name of sender</h6>
                <p class="date">5/6/2022</p>
                <p class="content">
                  notContent and another content and another content and another
                  content and another content
                </p>
              </div>
              <hr />
              <div class="notContent">
                <h6>Name of sender</h6>
                <p class="date">5/6/2022</p>
                <p class="content">
                  notContent and another content and another content and another
                  content and another content
                </p>
              </div>
              <hr />
              <div class="notContent">
                <h6>Name of sender</h6>
                <p class="date">5/6/2022</p>
                <p class="content">
                  notContent and another content and another content and another
                  content and another content
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {this.state.dropSign ? (
          <div id="dropSign">
            <p>You signed in as</p>
            <h5>Shelton</h5>
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
