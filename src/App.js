import './App.css';
import { Routes, Route } from 'react-router-dom';

import NoPage from './pages/NoPage';
import Login from './pages/Login';
import AppLayout from './layout/AppLayout.jsx';
import ProtectedRoute from './utilites/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/app/*'
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
