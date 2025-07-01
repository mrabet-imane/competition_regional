import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [anecdotes, setAnecdotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch {
      alert('Erreur lors du chargement des utilisateurs');
    }
  };

  const fetchAnecdotes = async () => {
    try {
      const res = await api.get('/anecdotes');
      setAnecdotes(res.data);
    } catch {
      alert('Erreur lors du chargement des anecdotes');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAnecdotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette anecdote ?')) return;

    try {
      await api.delete(`/anecdotes/${id}`);
      setAnecdotes(prev => prev.filter(a => a.id !== id));
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const startEditing = (id, content) => {
    setEditingId(id);
    setEditedContent(content);
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/anecdotes/${id}`, { content: editedContent });
      setAnecdotes(prev =>
        prev.map(a => (a.id === id ? { ...a, content: editedContent } : a))
      );
      setEditingId(null);
      setEditedContent('');
    } catch {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedContent('');
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#121212', minHeight: '100vh', color: '#FFD700' }}>
      <h2 style={{ borderBottom: '2px solid #FFD700', paddingBottom: 8, marginBottom: 24 }}>Utilisateurs</h2>
      <table style={{ width: '100%', marginBottom: 40, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #FFD700' }}>
            <th style={thStyle}>Nom</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={trStyle}>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ borderBottom: '2px solid #FFD700', paddingBottom: 8, marginBottom: 24 }}>Anecdotes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #FFD700' }}>
            <th style={thStyle}>Titre</th>
            <th style={thStyle}>Contenu</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {anecdotes.map(a => (
            <tr key={a.id} style={trStyle}>
              <td style={tdStyle}>{a.title}</td>
              <td style={tdStyle}>
                {editingId === a.id ? (
                  <textarea
                    value={editedContent}
                    onChange={e => setEditedContent(e.target.value)}
                    rows={4}
                    style={{
                      width: '100%',
                      backgroundColor: '#222',
                      color: '#FFD700',
                      border: '1px solid #FFD700',
                      borderRadius: 4,
                      padding: 8,
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      resize: 'vertical',
                    }}
                  />
                ) : (
                  a.content
                )}
              </td>
              <td style={tdStyle}>
                {editingId === a.id ? (
                  <>
                    <button style={saveBtnStyle} onClick={() => saveEdit(a.id)}>Enregistrer</button>
                    <button style={cancelBtnStyle} onClick={cancelEdit}>Annuler</button>
                  </>
                ) : (
                  <>
                    <button style={editBtnStyle} onClick={() => startEditing(a.id, a.content)}>Modifier</button>
                    <button style={deleteBtnStyle} onClick={() => handleDelete(a.id)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '10px',
  color: '#FFD700',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #444',
  verticalAlign: 'top',
  color: '#FFD700',
};

const trStyle = {
  backgroundColor: '#1a1a1a',
};

const btnBase = {
  border: 'none',
  borderRadius: 4,
  padding: '6px 12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginRight: 8,
  fontSize: '0.9rem',
  transition: 'background-color 0.3s ease',
};

const editBtnStyle = {
  ...btnBase,
  backgroundColor: '#FFD700',
  color: '#121212',
};

const deleteBtnStyle = {
  ...btnBase,
  backgroundColor: '#b30000',
  color: 'white',
};

const saveBtnStyle = {
  ...btnBase,
  backgroundColor: '#4CAF50',
  color: 'white',
};

const cancelBtnStyle = {
  ...btnBase,
  backgroundColor: '#888',
  color: 'white',
};
