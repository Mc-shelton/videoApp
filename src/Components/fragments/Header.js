import React from 'react';
import {Link} from 'react-router-dom'
import './../styles/Header.css'

import bell from './../images/bell.svg'
import plus from './../images/add-one.png'
import drop from './../images/down-one.png'
import avator from './../images/pp.jfif'
function Header(){

    return(
        
    <header id="header1">
    <div id="logo" class='hand'></div>
    <img src={bell} id="bell" class='hand' alt="bell" onclick="notifications()" />
    <div id="dropDwn" class='hand'>
      <img src={plus} alt="plus" id='plus' />
      <img src={drop} alt="drop" id='drop'/>
    </div>
    <div id="avator" class='hand'>
        <img src={avator}/>
    </div>
  </header>
    )
}
export default Header
