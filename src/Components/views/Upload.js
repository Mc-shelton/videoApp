import React,{useState} from 'react'
import FileArrowDown from './../images/FileArrowDown.png'
import './../styles/Dashboard.css'
import './../styles/Upload.css'

import axios from 'axios'

class Upload extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Topic:'',
            Title:'',
            Label:'',
            Descript:'',
            File:'',
        }
    };
    onSubmit= async()=>{
        if(this.state.Topic =='' || this.state.Title =='' || this.state.Label =='' || this.state.Descript ==''){
            alert('Please Fill The Blank Spaces')
        }else{
            axios
            .post(
                "https://dawn-aviation.com/static/php/upload.php",
                JSON.stringify({
                    Topic:this.state.Topic,
                    Title:this.state.Title,
                    Label:this.state.Label,
                    Descript:this.state.Descript,
                    File:this.state.File[0]
                })
            ).then((Response)=>{
                console.log(Response)
            }).catch((err)=>{
                alert(err)
            })
        }
    }
    render(){
        // const data = new FormData()
        // console.log(data)
    return(
        <div id='bigDash'>
        <h3>Upload Video</h3>
        <div id='uploadform'>
            <form action='#' method='POST'>
            <input type='text' placeholder='Topic of Study' value={this.state.Topic}
                onChange={(e) => {this.setState({Topic:e.target.value})}}
                />
            <input type='text' placeholder='Title' value={this.state.Title}
                onChange={(e) => {this.setState({Title:e.target.value})}}

            />
            <input type='text' placeholder='Label' value={this.state.Label}
                onChange={(e) => {this.setState({Label:e.target.value})}}

            />
            <input type='text' placeholder='Short Description' value={this.state.Descript}
                onChange={(e) => {this.setState({Descript:e.target.value})}}

            />
            <label id='fileLabel'  for='inFile'>
                <img src={FileArrowDown}/>
                <p>Click to Upload</p>
            </label>
            <input id='inFile' type='file' style={{display:'none'}} 
                onChange={(e) => {this.setState({File:e.target.files})}}

            />
            <button type='button' onClick={this.onSubmit}>submit</button>
            </form>
        </div>
        </div>
    )}
}

export default Upload;