import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password);
      const dataToSave = { ...formData };
      delete dataToSave.password;
      sessionStorage.setItem('pendingUserData', JSON.stringify(dataToSave));
      toast.success('Account created! Please check your email to verify.');
      navigate('/verify-email');
    } catch (error) {
      toast.error('Failed to create an account. The email might already be in use.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
  );
}

export default Signup;