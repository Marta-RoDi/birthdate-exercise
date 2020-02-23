import React, { Component } from 'react';
import userService from '../tools/userService';

class NewUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      birthdate: ""
    }
    this.service = new userService();
  }

  addNewUser(){
    this.service.create(this.state.name, this.state.birthdate).then(() => {
      this.setState({
        name: "",
        birthdate: ""
      })
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value })
  }

  render() {
    return(
      <React.Fragment>
          <form className="panel-form">
            <div className="panel-form__fields">
            <input placeholder="Nombre" className="panel-form__input" name="name" type="text" value={this.state.name} onChange={e => this.handleChange(e)}></input>
            <input placeholder="Cumpleaños" className="panel-form__input" name="birthdate" type="date" value={this.state.birthdate} onChange={e => this.handleChange(e)}></input>
            </div>
           <button className="panel-form__button" onClick={() => this.addNewUser()}>Añadir usuario</button>
          </form>
      </React.Fragment>
    )
  }
}

export default NewUser;