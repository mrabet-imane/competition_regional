import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">{user?.name}</h2>
      <ul className="sidebar-menu">
        {user?.role === 'admin' && (
          <li onClick={() => navigate('/admin')}>👥 Les Utilisateurs</li>
        )}
        <li onClick={() => navigate('/')}>📋 Les Anecdotes</li>
        <li onClick={handleLogout}>🚪 Se déconnecter</li>
      </ul>
    </div>
  );
}
