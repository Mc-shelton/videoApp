import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './../styles/Dashboard.css'
function Dashboard(){
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    return(
        <React.Fragment>
        <div id='bigDash'>
        <div id='search'>
            <input id='searchInput' type='text' placeholder='Search here'/>
        </div>
        <h3>Recently Added</h3>
        </div>
        </React.Fragment>
    )
}

export default Dashboard;