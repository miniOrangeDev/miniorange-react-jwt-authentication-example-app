import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [decodedToken, setDecodedToken] = useState(sessionStorage.getItem('decodedToken'));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      setError('Access Denied: You must be authenticated to view the homepage.');
    }
  }, [username]);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "SLO_URL";
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">Home Page</h1>
          {error && <Alert variant="danger text-center my-5">{error}</Alert>}
          {username ? (
            <>
              <p className="text-center">Welcome, <strong>{username}</strong>!</p>  
              <div className="d-flex justify-content-center">
                <pre>{decodedToken}</pre>
              </div>
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleLogout}>Logout</Button>
              </div>
            </>
          ) : (
            <p className="text-center text-info">Please login to continue.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
