// // import React, { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import { toast } from 'react-toastify';
// // import { doc, getDoc, setDoc } from 'firebase/firestore';
// // import { db } from '../components/firebase';

// // function Profile() {
// //   const { currentUser, userProfile, logout } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const createUserProfileInDB = async () => {
// //       if (currentUser) {
// //         const userDocRef = doc(db, "users", currentUser.uid);
// //         const docSnap = await getDoc(userDocRef);

// //         if (!docSnap.exists()) {
// //           const pendingDataString = sessionStorage.getItem('pendingUserData');
// //           if (pendingDataString) {
// //             const pendingData = JSON.parse(pendingDataString);
// //             if (pendingData.email === currentUser.email) {
// //               await setDoc(userDocRef, pendingData);
// //               sessionStorage.removeItem('pendingUserData');
// //               window.location.reload(); // Reload to fetch and display profile data
// //             }
// //           }
// //         }
// //       }
// //     };

// //     createUserProfileInDB();
// //   }, [currentUser]);

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       navigate('/login');
// //     } catch {
// //       toast.error('Failed to log out.');
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
// //       <h1>Profile</h1>
// //       <p>Welcome! Your email is verified.</p>
      
// //       <p><strong>Name:</strong> {userProfile ? userProfile.name : 'Loading...'}</p>
// //       <p><strong>Email:</strong> {currentUser?.email}</p>
      
// //       <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
// //         Log Out
// //       </button>
// //     </div>
// //   );
// // }

// // export default Profile;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// function Profile() {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/login');
//     } catch {
//       toast.error('Failed to log out.');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Profile</h1>
//       <p>Welcome! You are successfully logged in.</p>
//       <p><strong>Name:</strong> {currentUser?.displayName || 'N/A'}</p>
//       <p><strong>Email:</strong> {currentUser?.email}</p>
//       <button onClick={handleLogout} className={styles.submitButton} style={{ marginTop: '20px', backgroundColor: '#dc3545' }}>
//         Log Out
//       </button>
//     </div>
//   );
// }

// export default Profile;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import styles from '../styles/Auth.module.css'; // Import the CSS

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      toast.error('Failed to log out.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <p style={{ marginBottom: '20px' }}>Welcome! You are successfully logged in.</p>
      
      <div style={{ textAlign: 'left', display: 'inline-block' }}>
          <p><strong>Name:</strong> {currentUser?.displayName || 'N/A'}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
      </div>

      <button 
        onClick={handleLogout} 
        className={styles.submitButton} 
        style={{ marginTop: '30px', backgroundColor: '#dc3545' }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Profile;