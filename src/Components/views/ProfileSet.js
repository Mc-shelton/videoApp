import React from "react";
import './../styles/profileSet.css'


class ProfileSet extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            pic:''
        }
    }

    render(){
        return(
            <div id="bigProfile">
                <div >
                <label>change profile picture?</label>
                <form>
                    <input type='file'/>
                </form>
            </div>
            </div>
        )
    }
}
export default ProfileSet