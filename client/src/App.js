import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import UserDetail from './components/UserDetail';
import NewUser from './components/NewUser';

class App extends Component{

  render(){
    return (
     <div className="App">
       <Switch>
        <Route exact path="/" render={() => <Home/>}></Route>
        <Route exact path="/user/:id" render={() => <UserDetail/>}></Route>
        <Route exact path="/new" render={() => <NewUser/>}></Route>
       </Switch>
     </div>
    )
  }
}


export default App;
