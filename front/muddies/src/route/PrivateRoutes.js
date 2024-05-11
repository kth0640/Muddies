import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoutes = ({ element, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    // JWT 토큰 유효성 확인
    const checkAuth = () => {
      axios
        .get('http://localhost:8080/validate', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          if (response.status === 200) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error('Error validating token:', error);
          setAuthenticated(false);
        });
    };

    checkAuth();
  }, []);

  // authenticated 상태 변경 전에는 미렌더링
  if (authenticated === null) return null;

  return (
    authenticated ? <Outlet/> : <Navigate to='/login' />
  )
};

export default PrivateRoutes;