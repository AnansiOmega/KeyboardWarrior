import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Pages/home'
import { login } from './Pages/login'
import  Navbar  from './Components/navbar'




class App extends React.Component {
  render(){
    return (
      <div className="App">
        <div >
        <Navbar/>
        </div>
        <Switch>
          <Route exact path='/' component={login}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
