import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Map from './pages/Map';
import ProtectedRoute from './pages/ProtectedRoute';
import RegisterPage from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/map"
        element={
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>} />
      <Route path="/"
        element={
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
