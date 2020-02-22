import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../tools/userService';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      users: []
    };
    this.service = new userService();
  }

  componentDidMount() {
    this.service.getAll().then(response => {
      this.setState({
        users: response
      })
    })
  }

  render(){
    return(
      <React.Fragment>
        <p>esto es la home</p>
        <ul>
          {this.state.users.map((oneUser, idx) => {
            return (
              <li key={idx}>
                <Link to={`/user/${oneUser._id}`}><p>{oneUser.name}</p></Link>
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}

export default Home;