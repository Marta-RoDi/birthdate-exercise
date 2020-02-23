import React, { Component } from 'react';
import userService from '../../tools/userService';
import {Container, Row, Col} from 'react-bootstrap';

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
      <Container>
        <Row>
          <Col>
            <form className="default-form new-user-form">
              <p className="default-form__text">Crea un nuevo usuario:</p>
              <div className="default-form__fields">
                <input placeholder="Nombre" className="default-form__input" name="name" type="text" value={this.state.name} onChange={e => this.handleChange(e)}></input>
                <input placeholder="Cumpleaños" className="default-form__input" name="birthdate" type="date" value={this.state.birthdate} onChange={e => this.handleChange(e)}></input>
              </div>
              <button className="default-form__button" onClick={() => this.addNewUser()}>Añadir usuario</button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NewUser;