import React from "react";
import "./../styles/RightNav.css";
import Calendar from "react-calendar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlatList from "flatlist-react";
// import 'react-calendar/dist/Calendar.css'
export default class extends React.Component {
  constructor(props) {
    super(props);
    var maxheight = window.innerHeight;
    var wantedHeight = (86.5 * maxheight) / 100;
    this.state = {
      navHeight: wantedHeight,
      date: new Date(),
      addTask:false,
      addedTast:'',
      listTask:'',
      showTaskbutt:true,
      orignList:''
    };
  }

  getList =async ()=>{
    let userData = await AsyncStorage.getItem('userData')
    userData = JSON.parse(userData)

    let formData = new FormData()
    formData.append('Email',userData['Email'])
    axios({
      url:'https://dawn-aviation.com/static/php/getTasks.php',
      method:'POST',
      data:formData
    }).then((res)=>{
      let response = res.data
      this.setState({
        orignList:response
      })
      console.log('tasj',res)

    }).catch(()=>{
      alert('failed to fetch tasks')
    })
  }
  componentDidMount(){
    this.getList()
  }
  cover = (obj)=>{
    console.log(obj)
    let subList = [...document.getElementsByClassName('subList')]
    let parList = [...document.getElementsByClassName('parList')]
    let dotList = [...document.getElementsByClassName('dotList')]
        
            for(let i=0;i<subList.length;i++){
              subList[i].style.border = 'none';
              subList[i].style.background = 'none';
            }
            obj.style.borderLeft = '5px solid black'
            obj.style.background = 'rgb(183,183,183,0.25)'

  
  }
  delete=(ind)=>{
    let formData= new FormData();
    // alert(ind)
    formData.append('DelInd',ind)
    axios({
      url:'https://dawn-aviation.com/static/php/delete.php',
      method:'POST',
      data:formData
    })
    this.getList()
  }
   addition= async ()=>{
    let userData = await AsyncStorage.getItem('userData')
    userData = JSON.parse(userData)
    // alert(userData['UserId'])

    let formData = new FormData()

    if(this.state.addedTast != '' && this.state.addedTast != ' '){
    formData.append('Task',this.state.addedTast)
    formData.append('UserId',userData['Email'])
    
    axios({
      url:'https://dawn-aviation.com/static/php/tasks.php',
      method:'POST',
      data:formData

    }).then((res)=>{
      alert(res.data)
      this.getList();

    }).catch(()=>{
      alert('Error')
    })
  
    this.setState({
      showTaskbutt:true,
      addTask:false
    })
  }else{
      alert('please add a valid task')
    }


  }
renderTask = (item,ind)=>{
  console.log('item',item)
    return(
      <div class="subList" onClick={(e)=>{
        this.cover(e.target)
      }}>
        <div class="dotList" onClick={()=>{this.delete(item['task_ID'])}}></div>
        <p class='parList'>{item['Task']}</p>
        {/* <p class='cancel' onClick={()=>{
          this.delete()
        }}>x</p> */}
      </div>
    )
  }
  render() {
    return (
      <div
        id="bigRight"
        style={{ height: this.state.navHeight, float: "right", width: "18%" }}
      >
        <div id="rightBox">
          <div id="calendar">
            <Calendar
              className="calendar"
              defaultView="days"
              value={this.state.date}
            />
          </div>
          <div id="tasks">
            <div id="taskTitle">
              <h2>Today's Task</h2>
            </div>
            <div id="taskList">

          {this.state.addTask?<div id="addTask">
            <input onChange={(e)=>{
              // alert(e.target.value)
              this.setState({
                addedTast:e.target.value
              })
            
            }} placeholder="+ Add Task Here"/>
            <button onClick={this.addition}>Add</button>
          </div>:<></>}

                <div id='boxsubList'>
                  <FlatList
                  list={this.state.orignList}
                  renderItem={this.renderTask}
                  renderWhenEmpty={()=>{
                    return(
                    <p style={{fontSize:'14px'}}>No tasks available</p>
                    )
                  }}
                  />
              </div>
              {this.state.showTaskbutt?<button onClick={()=>{
                this.setState({
                  showTaskbutt:false,
                  addTask:true
                })
              }}>+ Add Task</button>:<></>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
