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
    const idUser = this.props.match.params.id
    this.service.get(idUser).then(response => {
      this.setState({
        user: response
      })
    })
  }

  deleteUser(userDelete) {
    this.service.remove(userDelete).then(response => {
      this.setState({
        users: response
      });
      window.location = "/"
    });
  }
  
  render(){
    return(
      <div>
        <p>Nombre: {this.state.user.name}</p>
        <p>Cumpleaños: {this.state.user.birthdate}</p>
        <button className="panel-delete"
          onClick={() => {
            this.deleteUser(this.state.user._id);
            }}
            >
            Eliminar
        </button>
      </div>
    )
  }
}

export default UserDetail;