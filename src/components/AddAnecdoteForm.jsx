import { useState } from 'react';
import api from '../services/api';

export default function AddAnecdoteForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({
    title: 'Surprenant!',
    content: '',
    category: 'Histoire'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/anecdotes', form);
      setForm({
        title: 'Surprenant!',
        content: '',
        category: 'Histoire'
      });
      setMessage('✅ Anecdote envoyée avec succès !');
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setMessage('❌ Erreur lors de l’envoi de l’anecdote.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Partager une anecdote</h3>

      <label style={styles.label}>Titre</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Contenu</label>
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Raconte-nous ton histoire (100 à 500 caractères)"
        minLength={100}
        maxLength={500}
        required
        style={styles.textarea}
      />

      <label style={styles.label}>Catégorie</label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="Histoire">Histoire</option>
        <option value="Humour">Humour</option>
        <option value="Vie quotidienne">Vie quotidienne</option>
        <option value="Échec">Échec</option>
        <option value="Succès">Succès</option>
        <option value="Commerce">Commerce</option>
      </select>

      <button type="submit" style={styles.button}>Soumettre</button>

      {message && <p style={styles.message}>{message}</p>}
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    marginBottom: '30px'
  },
  label: {
    display: 'block',
    marginTop: '10px',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px'
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px'
  },
  button: {
    backgroundColor: 'yellow',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  message: {
    marginTop: '10px',
    fontStyle: 'italic'
  }
};
