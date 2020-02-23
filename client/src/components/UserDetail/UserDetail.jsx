import React, { Component } from 'react';
import userService from '../../tools/userService';
import moment from 'moment';
import {Container, Row, Col} from 'react-bootstrap';

class UserDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      _id: "",
      name: "",
      birthdate: ""
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
            <form className="default-form update-user-form">
              <p className="default-form__text">Actualiza los datos del usuario:</p>
              <div className="default-form__fields">
                <input  className="default-form__input" name="name" type="text" value={this.state.name} onChange={e => this.handleChange(e)}></input>
                <input  className="default-form__input" name="birthdate" type="date" value={this.state.birthdate} onChange={e => this.handleChange(e)}></input>
              </div>
              <button className="default-form__button" onClick={() => this.editUser()}>Guardar cambios</button>
            </form>
        </Col>
      </Row>
    </Container>
    )
  }
}
export default UserDetail;