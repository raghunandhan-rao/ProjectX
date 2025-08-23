// // // // // import React, { useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { useAuth } from '../contexts/AuthContext';
// // // // // import { toast } from 'react-toastify';
// // // // // import { doc, getDoc, setDoc } from 'firebase/firestore';
// // // // // import { db } from '../components/firebase';

// // // // // function Profile() {
// // // // //   const { currentUser, userProfile, logout } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const createUserProfileInDB = async () => {
// // // // //       if (currentUser) {
// // // // //         const userDocRef = doc(db, "users", currentUser.uid);
// // // // //         const docSnap = await getDoc(userDocRef);

// // // // //         if (!docSnap.exists()) {
// // // // //           const pendingDataString = sessionStorage.getItem('pendingUserData');
// // // // //           if (pendingDataString) {
// // // // //             const pendingData = JSON.parse(pendingDataString);
// // // // //             if (pendingData.email === currentUser.email) {
// // // // //               await setDoc(userDocRef, pendingData);
// // // // //               sessionStorage.removeItem('pendingUserData');
// // // // //               window.location.reload(); // Reload to fetch and display profile data
// // // // //             }
// // // // //           }
// // // // //         }
// // // // //       }
// // // // //     };

// // // // //     createUserProfileInDB();
// // // // //   }, [currentUser]);

// // // // //   const handleLogout = async () => {
// // // // //     try {
// // // // //       await logout();
// // // // //       navigate('/login');
// // // // //     } catch {
// // // // //       toast.error('Failed to log out.');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
// // // // //       <h1>Profile</h1>
// // // // //       <p>Welcome! Your email is verified.</p>
      
// // // // //       <p><strong>Name:</strong> {userProfile ? userProfile.name : 'Loading...'}</p>
// // // // //       <p><strong>Email:</strong> {currentUser?.email}</p>
      
// // // // //       <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
// // // // //         Log Out
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Profile;




// // // // import React from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../contexts/AuthContext';
// // // // import { toast } from 'react-toastify';
// // // // import styles from '../styles/Auth.module.css';

// // // // function Profile() {
// // // //   const { currentUser, logout } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       await logout();
// // // //       navigate('/login');
// // // //     } catch {
// // // //       toast.error('Failed to log out.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className={styles.container}>
// // // //       <h1 className={styles.title}>Profile</h1>
// // // //       <p>Welcome! You are successfully logged in.</p>
// // // //       <p><strong>Name:</strong> {currentUser?.displayName || 'N/A'}</p>
// // // //       <p><strong>Email:</strong> {currentUser?.email}</p>
// // // //       <button onClick={handleLogout} className={styles.submitButton} style={{ marginTop: '20px', backgroundColor: '#dc3545' }}>
// // // //         Log Out
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Profile;




// // // import React from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../contexts/AuthContext';
// // // import { toast } from 'react-toastify';
// // // import styles from '../styles/Auth.module.css'; // Import the CSS

// // // function Profile() {
// // //   const { currentUser, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const handleLogout = async () => {
// // //     try {
// // //       await logout();
// // //       navigate('/login');
// // //     } catch {
// // //       toast.error('Failed to log out.');
// // //     }
// // //   };

// // //   return (
// // //     <div className={styles.container}>
// // //       <h1 className={styles.title}>Profile</h1>
// // //       <p style={{ marginBottom: '20px' }}>Welcome! You are successfully logged in.</p>
      
// // //       <div style={{ textAlign: 'left', display: 'inline-block' }}>
// // //           <p><strong>Name:</strong> {currentUser?.displayName || 'N/A'}</p>
// // //           <p><strong>Email:</strong> {currentUser?.email}</p>
// // //       </div>

// // //       <button 
// // //         onClick={handleLogout} 
// // //         className={styles.submitButton} 
// // //         style={{ marginTop: '30px', backgroundColor: '#dc3545' }}
// // //       >
// // //         Log Out
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // export default Profile;




// // import React, { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import { toast } from 'react-toastify';
// // import styles from '../styles/Auth.module.css';

// // function Profile() {
// //   // Get the full user profile (from MongoDB) and the logout function
// //   const { currentUser, userProfile, logout } = useAuth();
// //   const navigate = useNavigate();

// //   // This effect runs when the component loads or when the userProfile data changes
// //   useEffect(() => {
// //     // If we have the profile data, check if it's complete
// //     if (userProfile) {
// //       const isProfileIncomplete = !userProfile.selectedInterests || userProfile.selectedInterests.length < 3;
      
// //       // If it's incomplete, redirect the user
// //       if (isProfileIncomplete) {
// //         toast.info("Please complete your profile to continue.");
// //         navigate('/complete-profile');
// //       }
// //     }
// //   }, [userProfile, navigate]); // Dependencies for the effect

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       navigate('/login');
// //     } catch {
// //       toast.error('Failed to log out.');
// //     }
// //   };

// //   // Display a loading message until the profile data is fetched
// //   if (!userProfile) {
// //     return <div className={styles.container}><p>Loading profile...</p></div>;
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <h1 className={styles.title}>Profile</h1>
// //       <p style={{ marginBottom: '20px' }}>Welcome! You are successfully logged in.</p>
      
// //       <div style={{ textAlign: 'left', display: 'inline-block' }}>
// //           <p><strong>Name:</strong> {currentUser?.displayName || 'N/A'}</p>
// //           <p><strong>Email:</strong> {currentUser?.email}</p>
// //           {/* Display the star rating from the backend! */}
// //           <p><strong>Star Rating:</strong> {userProfile.starRating} ★</p> 
// //       </div>

// //       <button 
// //         onClick={handleLogout} 
// //         className={styles.submitButton} 
// //         style={{ marginTop: '30px', backgroundColor: '#dc3545' }}
// //       >
// //         Log Out
// //       </button>
// //     </div>
// //   );
// // }

// // export default Profile;




// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// function Profile() {
//   // 1. Get the new function from the context
//   const { userProfile, logout, requestNotificationPermission } = useAuth();
//   const navigate = useNavigate();

//   // This effect runs once when the profile data is loaded
//   useEffect(() => {
//     if (userProfile) {
//       // First, check if the profile is incomplete and redirect if needed
//       const isProfileIncomplete = !userProfile.selectedInterests || userProfile.selectedInterests.length < 3;
//       if (isProfileIncomplete) {
//         toast.info("Please complete your profile to continue.");
//         navigate('/complete-profile');
//         return; // Stop further execution
//       }
      
//       // 2. If the profile is complete, then ask for notification permission
//       requestNotificationPermission();
//     }
//   }, [userProfile, navigate, requestNotificationPermission]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/login');
//     } catch {
//       toast.error('Failed to log out.');
//     }
//   };

//   if (!userProfile) {
//     return <div className={styles.container}><p>Loading profile...</p></div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Profile</h1>
//       <p style={{ marginBottom: '20px' }}>Welcome! You are successfully logged in.</p>
      
//       <div style={{ textAlign: 'left', display: 'inline-block' }}>
//           <p><strong>Name:</strong> {userProfile.username || 'N/A'}</p>
//           <p><strong>Email:</strong> {userProfile.email}</p>
//           <p><strong>Star Rating:</strong> {userProfile.starRating} ★</p> 
//       </div>

//       <button 
//         onClick={handleLogout} 
//         className={styles.submitButton} 
//         style={{ marginTop: '30px', backgroundColor: '#dc3545' }}
//       >
//         Log Out
//       </button>
//     </div>
//   );
// }

// export default Profile;




import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import styles from '../styles/Auth.module.css';

function Profile() {
  const { userProfile, logout, requestNotificationPermission } = useAuth();
  const navigate = useNavigate();

  // This effect runs once when the profile data is loaded
  useEffect(() => {
    if (userProfile) {
      // First, check if the profile is incomplete and redirect if needed
      const isProfileIncomplete = !userProfile.selectedInterests || userProfile.selectedInterests.length < 3;
      if (isProfileIncomplete) {
        toast.info("Please complete your profile to continue.");
        navigate('/complete-profile');
        return; // Stop further execution
      }
      
      // If the profile is complete, and we don't have a token, ask for permission
      if (!userProfile.fcmTokens || userProfile.fcmTokens.length === 0) {
        requestNotificationPermission();
      }
    }
  }, [userProfile, navigate, requestNotificationPermission]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      toast.error('Failed to log out.');
    }
  };

  if (!userProfile) {
    return <div className={styles.container}><p>Loading profile...</p></div>;
  }

  // Determine if the manual button should be shown
  const showEnableButton = !userProfile.fcmTokens || userProfile.fcmTokens.length === 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <p style={{ marginBottom: '20px' }}>Welcome! You are successfully logged in.</p>
      
      <div style={{ textAlign: 'left', display: 'inline-block' }}>
          <p><strong>Name:</strong> {userProfile.username || 'N/A'}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Star Rating:</strong> {userProfile.starRating} ★</p> 
      </div>

      {/* --- NEW: Manual Notification Button --- */}
      {showEnableButton && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <p>To get updates, please enable notifications.</p>
            <button 
                onClick={requestNotificationPermission} 
                className={styles.submitButton}
                style={{backgroundColor: '#007bff'}}
            >
                Enable Notifications
            </button>
        </div>
      )}

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
