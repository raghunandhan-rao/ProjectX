
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       toast.success('Logged in successfully!');
//       navigate('/profile');
//     } catch {
//       toast.error('Failed to log in. Please check your credentials or verify your email.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
//       <h2>Log In</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
//         <button type="submit" style={{ width: '100%', padding: '10px' }}>Log In</button>
//       </form>
//       <p>Need an account? <Link to="/signup">Sign Up</Link></p>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import SocialLogins from '../components/SocialLogins';

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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Log In</button>
      </form>
      
      <SocialLogins />

      <p style={{ textAlign: 'center', marginTop: '20px' }}>Need an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;