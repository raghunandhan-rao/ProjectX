
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/profile');
    } catch {
      toast.error('Failed to log in. Please check your credentials or verify your email.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Log In</button>
      </form>
      <p>Need an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;