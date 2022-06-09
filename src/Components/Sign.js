import React from 'react';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Main from './Main';
function Sign(){
    return(
        <React.Fragment>
            <Switch>
            <Route path='/Main' component={Main}/>
            {/* <Route path='/SignIn' component={SignIn}/>
            <Route path='/SignOut' component={SignOut}/> */}
            <Redirect to='/Main'/>
            </Switch>
        </React.Fragment>
    )
}


export default withRouter(Sign);