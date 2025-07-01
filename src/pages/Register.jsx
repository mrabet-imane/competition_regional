import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mot de passe" required />
      <input name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} placeholder="Confirmer" required />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
