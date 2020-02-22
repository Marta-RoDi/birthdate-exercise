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
       <Route exact path="/" component={Home}></Route>
        <Route exact path="/user/:id" component={UserDetail}></Route>
        <Route exact path="/new" component={NewUser}></Route>
       </Switch>
     </div>
    )
  }
}


export default App;
