import React from 'react'
import './../styles/RightNav.css'
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
export default class extends React.Component{
    constructor(props){
        super(props);
        var maxheight = window.innerHeight
        var wantedHeight = ((86.5*maxheight)/100)
        this.state = {
            navHeight :wantedHeight,
            date:new Date()
        }
    }

    render(){
        return(
            <div id='bigRight' style={{height:this.state.navHeight, float:'right',width:'18%'}}>
            <div id="rightBox">
            <div id='calendar'>
            <Calendar className='calendar' defaultView='days' value={this.state.date}/> 
            </div>
            <div id='tasks'>
            <div id='taskTitle'>
                <h2>Today's Task</h2>
            </div>
            <div id='taskList'>
                <h5>No tasks currently</h5>
            </div>
            </div>
            </div></div>
        )
    }
}