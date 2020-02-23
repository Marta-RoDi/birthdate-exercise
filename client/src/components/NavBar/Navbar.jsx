import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';


class NavBar extends Component {

  render (){
    return(
         <Container>
          <Row className="align-items-center">
            <Col xs={3}>
              <h1 className="logo">PANEL</h1>
            </Col>
            <Col xs={9}>
              <nav className="navbar">
                <ul className="navbar-list">
                  <li className="navbar-list__item">
                    <NavLink exact to="/">Home</NavLink>
                  </li>
                  <li className="navbar-list__item">
                    <NavLink to="/new">Crear Usuario</NavLink>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      )
    }
  }

export default NavBar;