import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet/main.scss'
import NavBar from './components/NavBar/Navbar'
import Home from './components/Home/Home';
import UserDetail from './components/UserDetail/UserDetail';
import NewUser from './components/NewUser/NewUser';

class App extends Component{

  render(){
    return (
     <div className="App">
       <header className="header">
         <NavBar></NavBar>
       </header>
       <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/user/:id" component={UserDetail}></Route>
        <Route exact path="/new" component={NewUser}></Route>
       </Switch>
     </div>
    )
  }
}


export default App;
