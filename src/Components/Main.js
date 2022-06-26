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
import watchVid from "./views/watchVid";
import ProfileSet from "./views/ProfileSet";
import tvScreen from "./views/tvScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SwipeableViews from "react-swipeable-views";

function Main(props) {
  var [isLoggedin, setIsLoggedIn] = useState(false);
  var [showLeftNav, setShowLeftNav] = useState(true);
  var [showRightNav, setShowRightNav] = useState(true);
  var [toggleButt, setToggleButt] = useState(true);
  var [click, setClick] = useState(false);
  var [windClick, setWindClick] = useState(false);
  var [Data, setUserData] = useState('');
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
    var userData;
    const getDataStore = async () => {
      try {
        token = await AsyncStorage.getItem("token")
        userData = await AsyncStorage.getItem("userData")
        if (token != 'undefined' && token != null && token != 'false') {
          setIsLoggedIn(token);
          if(userData != 'undefined' && userData != null && userData != 'false'){
            setUserData(userData)
            // console.log('data',JSON.parse(Data))
          }
        } else {
          if (props.location.state != undefined) {
            var setToken = props.location.state.token;
            var userData = props.location.state.userData;
            await AsyncStorage.setItem("token", setToken);
            await AsyncStorage.setItem("userData", userData);
            setIsLoggedIn(setToken) 
            setUserData(userData) 
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDataStore();

    // if (window.innerWidth < 600) {
    //   var divChange = document.getElementsByClassName("divChange")
    //   alert(divChange[0])
    //   divChange[0].addEventListener("click", () => {
    //     setWindClick(true);
    //     console.log("hello world");
    //   });
    // }
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
      setShowRightNav(false);
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
  const ShowRightNavAct = ()=>{
    var rightSlide = document.getElementById("RightSlide")
    if(showRightNav == false){
    setShowRightNav(true)
    rightSlide.style.marginRight =  '53%'
    rightSlide.style.border = '1px solid grey'
    rightSlide.style.transform = 'rotate(-90deg)';
    }else{
      setShowRightNav(false)
      rightSlide.style.marginRight =  '5px'
      rightSlide.style.border = 'none'
      rightSlide.style.transform = 'rotate(90deg)';


    }
  }
  const state = `true`;

  if (isLoggedin != state) {
    return (
      <Switch>
        {/* <SignIn setIsLoggedIn={setIsLoggedIn}>sdf</SignIn> */}
        <Route path="/SignIn" component={SignIn} />
        <Route path="/signUp" component={signUp} />
        <Route path="/tvScreen" component={tvScreen} />
        <Redirect to="/tvScreen" />
      </Switch>
    );
  } else {
    const me = () => {
      setClick(true);
    };
    return (
      <React.Fragment>
        <div class="divChange">
          {isLoggedin ? <Header /> : <></>}
          {toggleButt ? (
            <div id="LeftSlide" onClick={ShowLeftNavAct}>
              <div class="inMate"></div>
            </div>
          ) : (
            <></>
          )}
          <div id="RightSlide" onClick={ShowRightNavAct}>
          </div>
          <div onClick={me}>{showLeftNav ? <LeftNav /> : <></>}</div>
          {showRightNav ? <RightNav /> : <></>}
        </div>
        <Switch>
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Search" component={Search} />
          <Route path="/Upload" component={Upload} />
          <Route path="/Favorite" component={Favorite} />
          <Route path="/LogOut" component={LogOut} />
          <Route path="/watchVid" component={watchVid} />
          <Route path="/ProfileSet" component={ProfileSet} />
          <Redirect to={{
            pathname:'/Dashboard',
            state:{toggleB:true,userData:Data}

          }} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(Main);
