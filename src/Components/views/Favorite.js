import React, { useEffect,useState } from 'react'
import './../styles/Dashboard.css'
import './../styles/search.css'
import './../styles/favorite.css'
import {Link} from 'react-router-dom'
import FlatList from 'flatlist-react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
function Favorite(props){
    const[mxHeight, setMxHeight] = useState('20px')
    const [videos, setVideos] = useState('');
  const [veryinit, setVeryinit] = useState();
  const [searchText, setSearchText] = useState();
  
    useEffect(()=>{
        // console.log(props.location.state)
    var maxheight = window.innerHeight;
    var wantedHeight = (61 * maxheight) / 100;
    setMxHeight(wantedHeight);
    })
    var change
    useEffect(async ()=>{
        setSearchText(<p style={{textAlign:'center'}}>type to search</p>)
        let userData = await AsyncStorage.getItem('userData')
        userData = JSON.parse(userData)
        let formData = new FormData()
        formData.append('Email',userData['Email'])

        axios({
            url:'https://dawn-aviation.com/static/php/favorites.php',
            method:'POST',
            data:formData
        })
        .then((responseJson)=>{
          console.log(responseJson)
        //   setVideos(responseJson)
          setVeryinit(responseJson)
          setVideos(responseJson)
      })
        .catch((error) => {
          change = error;
          console.log(change)
        });
        },[change])


  const search = (value)=>{
    let items = veryinit
    let text = value.toLowerCase()

    let filteredName = items.filter((item)=>{
      // console.log(item.)
      return item.videoName.toLowerCase().match(text)
    })
    if(!text || text === '' || text == ' '){
      console.log('first')
      setVideos(veryinit)
      
    }
      else if(!filteredName.length){
      console.log(filteredName)
      setVideos([])
      }
      else{
      console.log('third')
      setVideos(filteredName)
      }
      filteredName = veryinit
      console.log(filteredName)
      console.log('changed')
  }
      
    const renderList= (vid,ind)=>{
        // alert()
        return(

        <Link style={{textDecoration:'none'}} to={{ 
            pathname:'/watchVid',
            state:{vidList:videos,veryList:veryinit,vidPlay:ind}
        }}>
            <div class='smallPox'>
                <h6 class='h6'>{vid['Label']}</h6>
                <h5 class='h5'>{vid['Topic']}</h5>
                <h6 class='h62'>{vid['videoName']}</h6>
                <p class='p'>{vid['videoDescription']}</p>
            </div>

      </Link>
        )
    }
    return(
        <React.Fragment>
        <div id='bigDash'>
        <div id='search'>
            <input id='searchInput' onChange={(e)=>{
                search(e.target.value)
            }} type='text' placeholder='Search here'/>
        </div>
        <h3>Search Results</h3>
        </div>
        <div id='bigSearch' style={{height:mxHeight}}>
            <div id='smallerBig'>
                <FlatList
                list={videos}
                renderItem = {renderList}
                renderWhenEmpty ={()=><p>{searchText}</p>}
                />
            </div>
        </div>
        </React.Fragment>
    )
}

export default Favorite;