import React, { Component } from 'react';
import userService from '../tools/userService';
import moment from 'moment';

class UserDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      birthdate: ""
    };
    this.service = new userService();
  }

  componentDidMount() {
    const idUser = this.props.match.params.id
    this.service.get(idUser).then(response => {
      this.setState({
        name: response.name,
        birthdate: moment(response.birthdate).format("YYYY-MM-DD")
      })
    })
  }

  editUser(){
    const idUser = this.props.match.params.id
    this.service.update(idUser, this.state.name, this.state.birthdate).then(() => {
      this.setState({
        name: "",
        birthdate: ""
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

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value })
  }


  
  render(){
    return(
      <React.Fragment>
      <div>
        <p>Nombre: {this.state.name}</p>
        <p>Cumpleaños: {this.state.birthdate}</p>
        <button className="panel-delete"
          onClick={() => {
            this.deleteUser(this.state.user._id);
            }}
            >
            Eliminar
        </button>
      </div>
      <form className="panel-form">
        <div className="panel-form__fields">
          <input  className="panel-form__input" name="name" type="text" value={this.state.name} onChange={e => this.handleChange(e)}></input>
          <input  className="panel-form__input" name="birthdate" type="date" value={this.state.birthdate} onChange={e => this.handleChange(e)}></input>
        </div>
        <button className="panel-form__button" onClick={() => this.editUser()}>editar usuario</button>
      </form>
      </React.Fragment>
    )
  }
}

export default UserDetail;