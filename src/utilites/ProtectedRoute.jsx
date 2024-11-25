import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  if (!localStorage.getItem('user')) {
    return <Navigate to='/login' />;
    //return navigate('/login'); use for function , but <Navigate /> used in reder folw component
  } else {
    return props?.children;
  }
}
