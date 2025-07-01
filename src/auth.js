import axios from 'axios';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch {
    localStorage.removeItem('token');
    return false;
  }
};
