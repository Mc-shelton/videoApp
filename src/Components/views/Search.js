import React from 'react'
import './../styles/Dashboard.css'
import {Link} from 'react-router-dom'
function Search(){
    return(
        <React.Fragment>
        <div id='bigDash'>
        <div id='search'>
            <input id='searchInput' type='text' placeholder='Search here'/>
        </div>
        <h3>Search Results</h3>
        </div>
        </React.Fragment>
    )
}

export default Search;