import React from 'react'
import Main from './Components/Main';
import {BrowserRouter} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Main/>
    </BrowserRouter>
    </div>
  );
}
export default App;
