// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { role } = useSelector((state) => state.user);
  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;
