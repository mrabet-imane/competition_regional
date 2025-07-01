import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AnecdoteCard from '../components/AnecdoteCard';
import AddAnecdoteForm from '../components/AddAnecdoteForm';
import Sidebar from '../components/Sidebar';

export default function Home({ user }) {
  const [anecdotes, setAnecdotes] = useState([]);
  const navigate = useNavigate();

  const fetchAnecdotes = async () => {
    const res = await api.get('/anecdotes');
    setAnecdotes(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchAnecdotes();
  }, []);

  return (
    <div style={styles.page}>
      <Sidebar />

      <div className="container py-4" style={{ marginLeft: '250px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={styles.title}>Les Anecdotes</h2>
          <button onClick={handleLogout} style={styles.logoutButton}>Se déconnecter</button>
        </div>

        <div className="mb-4">
          <AddAnecdoteForm onSubmitSuccess={fetchAnecdotes} />
        </div>

        <div className="d-flex flex-column gap-3">
          {anecdotes.map(a => (
            <AnecdoteCard key={a.id} anecdote={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#121212',
    color: '#f1f1f1',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },
  logoutButton: {
    backgroundColor: '#FFD700',
    color: '#121212',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s ease',
  },
};
