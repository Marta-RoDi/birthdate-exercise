import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../tools/userService';
import {Container, Row, Col} from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

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

    if(this.state.users.length === 0){
      return <Spinner className="spinner" animation="border" />
    }

    return(
      <ErrorBoundary>
      <Container>
        <Row>
          <Col>
            <h1 className="title">¡Bienvenid@!</h1>
            <p className="information-text">Haz click sobre el nombre para ver los detalles del usario</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Animated animationIn="fadeInUp" isVisible={true}>
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
            </Animated>
          </Col>
        </Row>
      </Container>
      </ErrorBoundary>
    )
  }
}

export default Home;