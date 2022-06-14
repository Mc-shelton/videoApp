import React from 'react'
import {Link} from 'react-router-dom'
import AsyncStorage from "@react-native-async-storage/async-storage";

class LogOut extends React.Component{
    constructor(){
        super()
        this.state ={

        }
    }
    
    logOut = async ()=>{
        try{
            await AsyncStorage.removeItem('token')
        }catch(e){
            console.log(e)
        }
    }
    render(){
    return(
        <div style={{
            margin:'10%',
            color:'blue',
            marginLeft:'20%'
        }}>
            <h3 onClick={()=>{
                this.logOut()
                this.props.history.push({
                    pathname:'/',
                    state:{token:false}
                })
            }}>Click to Log Out</h3>

        </div>
    )
}}

export default LogOut