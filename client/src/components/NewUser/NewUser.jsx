import React, { Component } from 'react';
import userService from '../../tools/userService';
import {Container, Row, Col} from 'react-bootstrap';

class NewUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      birthdate: "",
      nameError: "",
      birthdateError: "",
      message: ""
    }
    this.service = new userService();
  }

  validate = () =>{
    let nameError = "";
    let birthdateError = "";

    if(!this.state.name){
      nameError = "Introduzca un nombre"
    }

    if(!this.state.birthdate){
      birthdateError = "Introduzca una fecha"
    }

    if(nameError || birthdateError){
      this.setState({nameError, birthdateError})
      return false;
    }
    return true;
    
  }

  addNewUser = () => {
      this.service.create(this.state.name, this.state.birthdate).then(() => {
        this.setState({
          name: "",
          birthdate: "",
          nameError: "",
          birthdateError: ""
        })
      })
      .then(() => {
        this.setState({
          ...this.state,
          message: "Usuario creado satisfactoriamente"
        })
    /*   setTimeout(() => {
          this.setState({
            ...this.state,
            message: ""
          })
        }, 4000); */
       })
       .catch(() => {
        this.setState({
          message: "No ha sido posible crear el usuario"
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.addNewUser()
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value })
  }

  render() {
    return(
      <Container>
        <Row>
          <Col>
            <form className="default-form new-user-form" onSubmit={this.handleSubmit}>
              <p className="default-form__text">Crear un nuevo usuario:</p>
              <div className="default-form__fields">
                <input placeholder="Nombre" className="default-form__input" name="name" type="text" value={this.state.name} onChange={e => this.handleChange(e)}></input>
                {this.state.nameError &&
                <p className="default-form__error-name">
                {this.state.nameError}
                </p>
                }
                <input maxLength="10" min="1910-01-01" max="2020-12-31" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" placeholder="Cumpleaños" className="default-form__input" name="birthdate" type="date" value={this.state.birthdate} onChange={e => this.handleChange(e)}></input>
                {this.state.birthdateError &&
                <p className="default-form__error-birthdate">
                {this.state.birthdateError}
                </p>
                }
              </div>
              <button className="default-form__button" type="submit">Añadir usuario</button>
             
            </form>
            {this.state.message && (
                <p className="default-alert">{this.state.message}</p>
              )}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NewUser;