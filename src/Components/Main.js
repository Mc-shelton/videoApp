import React, { useState, useEffect } from "react";
import Header from "./fragments/Header";
import LeftNav from "./fragments/LeftNav";
import RightNav from "./fragments/RightNav";
import "./styles/Main.css";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Search from "./views/Search";
import Upload from "./views/Upload";
import Favorite from "./views/Favorite";
import LogOut from "./views/LogOut";
import SignIn from "./views/SignIn";
import signUp from "./views/signUp";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SwipeableViews from "react-swipeable-views";

function Main(props) {
  var [isLoggedin, setIsLoggedIn] = useState(false);
  var [showLeftNav, setShowLeftNav] = useState(true);
  var [showRightNav, setShowRightNav] = useState(false);
  var [toggleButt, setToggleButt] = useState(true);
  var [click, setClick] = useState(false);
  var [windClick, setWindClick] = useState(false);
  var ver;

  // var getData = async () => {
  //   try {
  //     if(props.location.state != undefined){
  //       setIsLoggedIn(props.location.state.token)
  //       await AsyncStorage.setItem('token',props.location.state.token)
  //       alert('if')
  //     }else{
  //       await AsyncStorage.setItem('token',false)
  //       alert('else')
  //     }
  //     var token = await AsyncStorage.getItem("token");
  //     setIsLoggedIn(token)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    var token;
    // console.log(AsyncStorage.getItem('token'))
    const getDataStore = async () => {
      try {
        if ((token = await AsyncStorage.getItem("token"))) {
          setIsLoggedIn(token);
        } else {
          if (props.location.state != undefined) {
            var setToken = props.location.state.token;
            await AsyncStorage.setItem("token", setToken);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDataStore();

    if (window.innerWidth < 600) {
      var divChange = document.getElementsByClassName("divChange")
      alert(divChange[0])
      divChange[0].addEventListener("click", () => {
        setWindClick(true);
        console.log("hello world");
      });
    }
  });

  useEffect(() => {
    console.log(click);
    if (click == true) {
      setShowLeftNav(false);
      setToggleButt(true);
    }
    setClick(false);
  }, [windClick]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setShowLeftNav(false);
    }

    if (props.location.state != undefined && window.innerWidth < 600) {
      setShowLeftNav(props.location.state.showNav);
      setToggleButt(props.location.state.toggleB);
    } else {
    }
  }, [props.location.state]);

  const ShowLeftNavAct = () => {
    setToggleButt(false);
    setShowLeftNav(true);
  };
  const state = `true`;

  if (isLoggedin != state) {
    return (
      <Switch>
        {/* <SignIn setIsLoggedIn={setIsLoggedIn}>sdf</SignIn> */}
        <Route path="/SignIn" component={SignIn} />
        <Route path="/signUp" component={signUp} />
        <Redirect to="/SignIn" />
      </Switch>
    );
  } else {
    const me = () => {
      setClick(true);
    };
    return (
      <React.Fragment>
      <div class='divChange'>
        {isLoggedin ? <Header /> : <></>}
        {toggleButt ? (
          <div id="LeftSlide" onClick={ShowLeftNavAct}>
            <div class="inMate"></div>
          </div>
        ) : (
          <></>
        )}
        <div id="RightSlide"></div>
        <div onClick={me}>{showLeftNav ? <LeftNav /> : <></>}</div>
        {showRightNav ? <RightNav /> : <></>}
        </div>
        <Switch>
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Search" component={Search} />
          <Route path="/Upload" component={Upload} />
          <Route path="/Favorite" component={Favorite} />
          <Route path="/LogOut" component={LogOut} />
          <Redirect to="/Dashboard" />
        </Switch>

      </React.Fragment>
    );
  }
}

export default withRouter(Main);
