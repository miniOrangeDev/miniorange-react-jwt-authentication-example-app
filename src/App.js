import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './Home';
import { Navbar, Nav, Container } from 'react-bootstrap';
import xecurify from './xecurify-logo.png';
import TokenHandler from './TokenHandler';

function App() {
  return (
    <Router>  
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '80px' }}>
          <Container>
            <Navbar.Brand href="/">  
              <img src={xecurify} alt="Xecurify Logo" width="200px" height="90px" />  
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <NavLink to="/home" className="nav-link">Home</NavLink>
                <Nav.Link href="SSO_URL">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<TokenHandler />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
