import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../tools/userService';
import {Container, Row, Col} from 'react-bootstrap';

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

  deleteUser(userDelete) {
    this.service.remove(userDelete).then(response => {
      this.setState({
        users: response
      });
    });
  }

  render(){
    return(
      <Container>
        <Row>
          <Col>
            <h1 className="title">¡Bienvenid@!</h1>
            <p className="information-text">Haz click sobre el nombre para ver los detalles del usario</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul className="user-list">
              {this.state.users.map((oneUser, idx) => {
                return (
                  <li key={idx} className="user-list__item">
                    <Link to={`/user/${oneUser._id}`}>{oneUser.name}</Link>
                    <button className="delete-user"
                    onClick={() => {
                    this.deleteUser(oneUser._id);
                    }}
                    >
                      Eliminar
                    </button>
                  </li>
                )
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home;