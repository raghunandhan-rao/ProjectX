


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import SocialLogins from '../components/SocialLogins';
import styles from '../styles/Auth.module.css'; // Import the CSS

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
      toast.error('Failed to log in. Check credentials or verify your email.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.inputField} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className={styles.inputField} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className={styles.submitButton}>Log In</button>
      </form>
      <div className={styles.divider}>OR</div>
      <SocialLogins />
      <p className={styles.redirectLink}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;