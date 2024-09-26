import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JWTBuilder from './react-jwt-connector/JWTBuilder';
import certFile from './RSA256Cert.crt';

function TokenHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleToken = async () => {
      const token = new URLSearchParams(location.search).get('id_token');

      if (token) {
        const jwtBuilder = new JWTBuilder();
        const parsedToken = jwtBuilder.parseJwt(token);

        try {
          // Fetch the certificate file
          const response = await fetch(certFile);
          const publicKey = await response.text();

          // Verify the token
          const isVerified = await jwtBuilder.verifyJwtWithPublicKey(publicKey);

          if (isVerified) {
            const email = parsedToken.getPayload().email;
            sessionStorage.setItem('username', email);
            sessionStorage.setItem('decodedToken', JSON.stringify(parsedToken.getPayload(), null, 2));

            // Redirect to /home after verification
            navigate('/home');
          } else {
            console.error('Invalid token');
          }
        } catch (e) {
          console.error('Token verification failed:', e.message || e);
        }
      } else {
        console.error('No token found');
      }
    };

    handleToken();
  }, [location, navigate]);

  return null; // No UI needed for this route
}

export default TokenHandler;
    