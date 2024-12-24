import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Map from './pages/Map';
import ProtectedRoute from './pages/ProtectedRoute';
import RegisterPage from './pages/Register';
import Layout from './components/layout';
import Users from './pages/Users';

function App() {
  return (
    <Routes>
      <Route path="/map"
        element={
          <ProtectedRoute>
            <Layout>
              <Map />
            </Layout>
          </ProtectedRoute>} />
      <Route path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>} />
      <Route path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Map />
            </Layout>
          </ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
