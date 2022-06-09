import FileArrowDown from './../images/FileArrowDown.png'
import './../styles/Dashboard.css'
import './../styles/Upload.css'
import React from 'react'

function Upload(){
    return(
        <div id='bigDash'>
        <h3>Upload Video</h3>
        <div id='uploadform'>
            <form action='#' method='POST'>
            <input type='text' placeholder='Topic of Study'/>
            <input type='text' placeholder='Select Video'/>
            <input type='text' placeholder='Short Description'/>
            <label id='fileLabel'  for='inFile'>
                <img src={FileArrowDown}/>
                <p>Click to Upload</p>
            </label>
            <input id='inFile' type='file' style={{display:'none'}}/>
            <button type='submit'>submit</button>
            </form>
        </div>
        </div>
    )
}

export default Upload;