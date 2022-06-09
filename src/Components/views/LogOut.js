import React from 'react'
import {Link} from 'react-router-dom'

class LogOut extends React.Component{
    constructor(){
        super()
        this.state ={

        }
    }
    render(){
    return(
        <div style={{
            margin:'10%',
            color:'blue',
            marginLeft:'20%'
        }}>
        <Link to ={{
            pathname:'/',
            state:{
                token:false
            }
        }}>
            <h3>Click to Log Out</h3>

        </Link>
        </div>
    )
}}

export default LogOut