import React, { useEffect, useState } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Pages/home'
import { Info } from './Pages/info'
import  Navbar  from './Components/navbar'




const App = () => {
  const [lightMode, setlightMode] = useState(true)
  useEffect(() => {
    lightMode ? document.body.className = 'light' : document.body.className = 'dark'
  },[lightMode])
  const [ light, setLight ] = useState(true)

  const changeBackground = () => {
    setlightMode(!lightMode)
    setLight(!light)
  }


  let color = lightMode ? null : { color:'rgb(153, 255, 204, 1)' }
  return (
        <div className="App">
          <div className='navbar-div'>
          <Navbar color={color}/>
          </div>
          <Switch>
            <Route exact path='/info' component={() => <Info color={color}/>}/>
            <Route path='/' component={() => <Home changeBackground={changeBackground} light={light} color={color} />}/>
          </Switch>
        </div>
      );
}


export default App;
