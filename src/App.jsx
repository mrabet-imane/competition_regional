import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated } from './auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    isAuthenticated().then(setUser);
  }, []);

  if (user === null) return <div>Chargement...</div>;

  return (<>
    {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={ <Home user={user} /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={<Register />  } />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}
