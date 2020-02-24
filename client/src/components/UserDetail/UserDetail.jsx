import React, { Component } from 'react';
import userService from '../../tools/userService';
import moment from 'moment';
import {Container, Row, Col} from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class UserDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      users: [],
      _id: "",
      name: "",
      birthdate: "",
      nameError: "",
      birthdateError: "",
      message: ""
    };
    this.service = new userService();
  }

  componentDidMount() {
    const idUser = this.props.match.params.id
    this.service.get(idUser).then(response => {
      this.setState({
        _id: response._id,
        name: response.name,
        birthdate: moment(response.birthdate).format("YYYY-MM-DD")
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

  validate = () =>{
    let nameError = "";
    let birthdateError = "";

    if(!this.state.name){
      nameError = "Introduzca un nombre"
    }

    if(!this.state.birthdate){
      birthdateError = "Introduzca una fecha"
    }

    if((this.state.birthdate && moment(this.state.birthdate).format() > moment('2020-03-01').max('2020-03-01').format()) || moment(this.state.birthdate).format() < moment('1910-01-01').max('1910-01-01').format()){
      birthdateError = "Formato no válido"
    }

    if(nameError || birthdateError){
      this.setState({nameError, birthdateError})
      return false;
    }
    return true;
  }

  editUser(){
    const idUser = this.props.match.params.id
    this.service.update(idUser, this.state.name, this.state.birthdate).then(() => {
      this.setState({
        nameError: "",
        birthdateError: ""
      })
    })
    .then(() => {
      this.setState({
        ...this.state,
        message: "Usuario actualizado satisfactoriamente"
      })
    setTimeout(() => {
        this.setState({
          ...this.state,
          message: ""
        })
      }, 4000);
     })
     .catch(() => {
      this.setState({
        message: "No ha sido posible actualizar el usuario"
      })
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.editUser()
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value })
  }

  render(){

   if(!this.state._id){
        return <Spinner className="spinner" animation="border" />
      } 

    return(
      <ErrorBoundary>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <p className="name"><span className="bold">Nombre:</span> {this.state.name}</p>
              <p className="birthdate"><span className="bold">Cumpleaños:</span> {this.state.birthdate}</p>
              <button className="delete-user"
                onClick={() => {
                  this.deleteUser(this.state._id);
                }}
              >
                Eliminar
              </button>
          </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
            <form className="default-form new-user-form" onSubmit={this.handleSubmit}>
                <p className="default-form__text">Actualizar usuario:</p>
                <div className="default-form__fields">
                  <input placeholder="Nombre" className="default-form__input" name="name" type="text" value={this.state.name} onChange={e => this.handleChange(e)}></input>
                  {this.state.nameError &&
                  <p className="default-form__error-name">
                  {this.state.nameError}
                  </p>
                  }
                  <input maxLength="10"  pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" placeholder="Cumpleaños" className="default-form__input" name="birthdate" type="date" value={this.state.birthdate} onChange={e => this.handleChange(e)}></input>
                  {this.state.birthdateError &&
                  <p className="default-form__error-birthdate">
                  {this.state.birthdateError}
                  </p>
                  }
                </div>
                <button className="default-form__button" type="submit">Guardar cambios</button>
              
              </form>
              {this.state.message && (
                  <p className="default-alert">{this.state.message}</p>
                )}
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
    )
  }
}
export default UserDetail;