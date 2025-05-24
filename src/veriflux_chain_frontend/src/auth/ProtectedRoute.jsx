import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../Pages/UserContext';

const ProtectedRoute = ({ children }) => {
  const { userPrincipal } = useUser();

  if (!userPrincipal) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
