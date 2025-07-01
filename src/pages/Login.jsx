import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch {
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className=" bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" >
        <div className="text-center mb-4">
          <div className="rounded-circle bg-warning text-dark fw-bold fs-4 d-inline-block px-4 py-3">
            WOW
          </div>
          <div className="mt-2 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>
            World of Work
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-light text-dark p-4 rounded shadow">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="text-decoration-none small text-primary">Mot de passe oublié ?</a>
            <a href="/register" className="text-decoration-none small text-primary">Créer un compte</a>
          </div>

          <button type="submit" className="btn btn-warning w-100 fw-bold">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
