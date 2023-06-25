import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto">
      <Container>

        <Row>
          <Col className="text-center">
            <a href="https://github.com/Crapteep"><FaGithub className="mx-2" /></a>
            <a href="https://www.linkedin.com/in/michalgiera/"><FaLinkedin className="mx-2" /></a>
            <a href="https://google.com"><FaGoogle className="mx-2" /></a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" >
            <p>Wszelkie prawa zastrzeżone &copy; {new Date().getFullYear()} Crapteep</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
