import React, { useEffect, useState } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Pages/home'
import { Info } from './Pages/info'
import  Navbar  from './Components/navbar'




const App = () => {
  const [lightMode, setlightMode] = useState(true)
  useEffect(() => {
    lightMode ? document.body.style.color = 'rgb(0, 0, 0, 1)' : document.body.style.color = 'rgb(153, 255, 204, 1)'
    lightMode ? document.body.style.backgroundColor = 'rgb(153, 255, 204, 0.5)' : document.body.style.backgroundColor = 'rgb(0, 0, 0, 0.7)'
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
            <Route path='/home' component={() => <Home changeBackground={changeBackground} light={light} color={color} />}/>
          </Switch>
        </div>
      );
}


export default App;
