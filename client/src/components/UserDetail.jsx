import React, { Component } from 'react';
import userService from '../tools/userService';

class UserDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: {}
    };
    this.service = new userService();
  }

  componentDidMount() {
    this.service.get(this.props.id).then(response => {
      this.setState({
        user: response
      })
    })
  }
  
  render(){
    return(
      <div><p>name: {this.state.user.name}</p></div>
    )
  }
}

export default UserDetail;