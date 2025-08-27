
// // // // // import React, { useState } from 'react';
// // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // import { useAuth } from '../contexts/AuthContext';
// // // // // import { toast } from 'react-toastify';
// // // // // import SocialLogins from '../components/SocialLogins';
// // // // // import styles from '../styles/Auth.module.css'; // Import the CSS

// // // // // function Signup() {
// // // // //   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
// // // // //   const { signup } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const handleChange = (e) => {
// // // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       await signup(formData.email, formData.password, formData.name);
// // // // //       toast.success('Account created! Please check your email to verify.');
// // // // //       navigate('/verify-email');
// // // // //     } catch (error) {
// // // // //       toast.error('Failed to create an account. The email might be in use.');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className={styles.container}>
// // // // //       <h2 className={styles.title}>Create an Account</h2>
// // // // //       <form onSubmit={handleSubmit} className={styles.form}>
// // // // //         <input className={styles.inputField} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
// // // // //         <input className={styles.inputField} type="email" name="email" placeholder="Email" onChange={handleChange} required />
// // // // //         <input className={styles.inputField} type="password" name="password" placeholder="Password" onChange={handleChange} required />
// // // // //         <button type="submit" className={styles.submitButton}>Sign Up</button>
// // // // //       </form>
// // // // //       <div className={styles.divider}>OR</div>
// // // // //       <SocialLogins />
// // // // //       <p className={styles.redirectLink}>
// // // // //         Already have an account? <Link to="/login">Log In</Link>
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Signup;



// // // // import React, { useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../contexts/AuthContext';
// // // // import { toast } from 'react-toastify';
// // // // import styles from '../styles/Auth.module.css';

// // // // function Signup() {
// // // //   const [email, setEmail] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const { signup } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       // The 'name' field is no longer needed here
// // // //       await signup(email, password);
// // // //       toast.success('Account created! Please check your email to verify.');
// // // //       navigate('/verify-email');
// // // //     } catch (error) {
// // // //       toast.error('Failed to create an account. The email might be in use.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className={styles.container}>
// // // //       <h2 className={styles.title}>Create an Account</h2>
// // // //       <form onSubmit={handleSubmit} className={styles.form}>
// // // //         <input className={styles.inputField} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
// // // //         <input className={styles.inputField} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
// // // //         <button type="submit" className={styles.submitButton}>Sign Up</button>
// // // //       </form>
// // // //       <p>Already have an account? <Link to="/login">Log In</Link></p>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Signup;




// // // import React, { useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../contexts/AuthContext';
// // // import { toast } from 'react-toastify';
// // // import SocialLogins from '../components/SocialLogins'; // 1. Import the SocialLogins component
// // // import styles from '../styles/Auth.module.css';

// // // function Signup() {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const { signup } = useAuth();
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await signup(email, password);
// // //       toast.success('Account created! Please check your email to verify.');
// // //       navigate('/verify-email');
// // //     } catch (error) {
// // //       toast.error('Failed to create an account. The email might be in use.');
// // //     }
// // //   };

// // //   return (
// // //     <div className={styles.container}>
// // //       <h2 className={styles.title}>Create an Account</h2>
// // //       <form onSubmit={handleSubmit} className={styles.form}>
// // //         <input className={styles.inputField} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
// // //         <input className={styles.inputField} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
// // //         <button type="submit" className={styles.submitButton}>Sign Up with Email</button>
// // //       </form>
      
// // //       {/* 2. Add the divider and the SocialLogins component */}
// // //       <div className={styles.divider} style={{margin: '1.5rem 0'}}>OR</div>
// // //       <SocialLogins />

// // //       <p style={{marginTop: '1.5rem'}}>
// // //         Already have an account? <Link to="/login">Log In</Link>
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // // export default Signup;




// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import { toast } from 'react-toastify';
// // import SocialLogins from '../components/SocialLogins';
// // import styles from '../styles/Auth.module.css';

// // function Signup() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const { signup } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Username is no longer collected here
// //       await signup(email, password);
// //       toast.success('Account created! Please check your email to verify.');
// //       navigate('/verify-email');
// //     } catch (error) {
// //       toast.error('Failed to create an account. The email might be in use.');
// //     }
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <h2 className={styles.title}>Create an Account</h2>
// //       <form onSubmit={handleSubmit} className={styles.form}>
// //         <input className={styles.inputField} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
// //         <input className={styles.inputField} type="password" placeholder="Password (min. 6 characters)" onChange={(e) => setPassword(e.target.value)} required />
// //         <button type="submit" className={styles.submitButton}>Sign Up with Email</button>
// //       </form>
// //       <div style={{margin: '1.5rem 0'}}>OR</div>
// //       <SocialLogins />
// //       <p style={{marginTop: '1.5rem'}}>
// //         Already have an account? <Link to="/login">Log In</Link>
// //       </p>
// //     </div>
// //   );
// // }

// // export default Signup;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// const interestOptions = ["dance", "sports", "music", "art", "technology", "travel", "food", "fashion", "gaming", "reading"];

// function CompleteProfile() {
//     const { currentUser, refreshUserProfile } = useAuth();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         gender: '',
//         selectedInterests: [],
//     });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleInterestChange = (interest) => {
//         setFormData(prev => ({
//             ...prev,
//             selectedInterests: prev.selectedInterests.includes(interest)
//                 ? prev.selectedInterests.filter(i => i !== interest)
//                 : [...prev.selectedInterests, interest]
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.username.trim()) {
//             toast.error("Please enter a username.");
//             return;
//         }
//         if (formData.selectedInterests.length < 3) {
//             toast.error("Please select at least 3 interests.");
//             return;
//         }
//         setLoading(true);
//         try {
//             const idToken = await currentUser.getIdToken();
//             await axios.patch(
//                 'http://localhost:3000/api/users/profile',
//                 formData,
//                 { headers: { Authorization: `Bearer ${idToken}` } }
//             );
//             await refreshUserProfile();
//             toast.success("Profile created successfully!");
//             navigate('/profile');
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to create profile.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.title}>One Last Step...</h2>
//             <p>Choose a unique username and select your interests to start connecting.</p>
//             <form onSubmit={handleSubmit} className={styles.form} style={{marginTop: '1.5rem'}}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Choose a Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className={styles.inputField}
//                     required
//                 />
//                 {/* ... (rest of the form is the same) ... */}
//                 <button type="submit" className={styles.submitButton} disabled={loading}>
//                     {loading ? <div className={styles.loader}></div> : 'Save and Continue'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CompleteProfile;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import SocialLogins from '../components/SocialLogins';
import styles from '../styles/Auth.module.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Username is no longer collected here
      await signup(email, password);
      toast.success('Account created! Please check your email to verify.');
      navigate('/verify-email');
    } catch (error) {
      toast.error('Failed to create an account. The email might be in use.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create an Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.inputField} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className={styles.inputField} type="password" placeholder="Password (min. 6 characters)" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className={styles.submitButton}>Sign Up with Email</button>
      </form>
      <div style={{margin: '1.5rem 0'}}>OR</div>
      <SocialLogins />
      <p style={{marginTop: '1.5rem'}}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signup;
