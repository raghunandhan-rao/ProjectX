


// // // // import React from 'react';
// // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // // // import Signup from './pages/Signup';
// // // // import Login from './pages/Login';
// // // // import Profile from './pages/Profile';
// // // // import VerifyEmail from './pages/VerifyEmail';
// // // // import CompleteProfile from './pages/CompleteProfile';
// // // // import Discover from './pages/Discover'; // 1. Import the new Discover page
// // // // import { ToastContainer } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';

// // // // function ProtectedRoute({ children }) {
// // // //   const { currentUser } = useAuth();
// // // //   if (!currentUser) return <Navigate to="/login" />;
// // // //   if (currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified) {
// // // //     return <Navigate to="/verify-email" />;
// // // //   }
// // // //   return children;
// // // // }

// // // // function AppRoutes() {
// // // //   const { currentUser } = useAuth();
// // // //   return (
// // // //     <Routes>
// // // //       <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
// // // //       <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
// // // //       <Route path="/verify-email" element={<VerifyEmail />} />
      
// // // //       <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
// // // //       <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
// // // //       {/* 2. Add the new protected route for the Discover page */}
// // // //       <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />

// // // //       <Route path="*" element={<Navigate to="/login" />} />
// // // //     </Routes>
// // // //   );
// // // // }

// // // // function App() {
// // // //   return (
// // // //     <AuthProvider>
// // // //       <Router>
// // // //         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
// // // //         <AppRoutes />
// // // //       </Router>
// // // //     </AuthProvider>
// // // //   );
// // // // }

// // // // export default App;





// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { AuthProvider, useAuth } from './contexts/AuthContext';

// // // // Import Pages and Components
// // // import Signup from './pages/Signup';
// // // import Login from './pages/Login';
// // // import Profile from './pages/Profile';
// // // import VerifyEmail from './pages/VerifyEmail';
// // // import CompleteProfile from './pages/CompleteProfile';
// // // import Discover from './pages/Discover';
// // // import Notifications from './pages/Notifications';
// // // import Header from './components/Header';

// // // import { ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';

// // // function ProtectedRoute({ children }) {
// // //   const { currentUser } = useAuth();
// // //   if (!currentUser) {
// // //     return <Navigate to="/login" />;
// // //   }
// // //   if (currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified) {
// // //     return <Navigate to="/verify-email" />;
// // //   }
// // //   return children;
// // // }

// // // function AppRoutes() {
// // //   const { currentUser } = useAuth();
// // //   return (
// // //     <Routes>
// // //       <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
// // //       <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
// // //       <Route path="/verify-email" element={<VerifyEmail />} />
      
// // //       <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
// // //       <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
// // //       <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
// // //       <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      
// // //       <Route path="*" element={<Navigate to="/login" />} />
// // //     </Routes>
// // //   );
// // // }

// // // function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <Router>
// // //         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
// // //         <Header />
// // //         <div className="main-content" style={{paddingTop: '80px'}}> {/* Add padding to prevent content from hiding behind the fixed header */}
// // //             <AppRoutes />
// // //         </div>
// // //       </Router>
// // //     </AuthProvider>
// // //   );
// // // }

// // // export default App;





// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { AuthProvider, useAuth } from './contexts/AuthContext';

// // // Import Pages and Components
// // import Signup from './pages/Signup';
// // import Login from './pages/Login';
// // import Profile from './pages/Profile';
// // import VerifyEmail from './pages/VerifyEmail';
// // import CompleteProfile from './pages/CompleteProfile';
// // import Discover from './pages/Discover';
// // import Notifications from './pages/Notifications';
// // import Header from './components/Header';

// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import styles from './styles/Auth.module.css'; // For the loader

// // // This is now the central gatekeeper for your application
// // function ProtectedRoute({ children }) {
// //   const { currentUser, isProfileComplete, loading } = useAuth();

// //   // 1. While the auth state is loading, show a loading spinner
// //   if (loading) {
// //     return (
// //       <div className={styles.container}>
// //         <div className={styles.loader} style={{borderTopColor: 'var(--primary-color)'}}></div>
// //       </div>
// //     );
// //   }

// //   // 2. If not loading and no user, redirect to login
// //   if (!currentUser) {
// //     return <Navigate to="/login" />;
// //   }
  
// //   // 3. If user exists but their email is not verified, redirect to verify page
// //   if (currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified) {
// //     return <Navigate to="/verify-email" />;
// //   }

// //   // 4. If user exists and is verified, but profile is incomplete, force redirect
// //   if (!isProfileComplete) {
// //     // Allow access only to the complete-profile page
// //     return children.type === CompleteProfile ? children : <Navigate to="/complete-profile" />;
// //   }

// //   // 5. If everything is complete, render the requested page
// //   return children;
// // }

// // function AppRoutes() {
// //   return (
// //     <Routes>
// //       <Route path="/signup" element={<Signup />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/verify-email" element={<VerifyEmail />} />
      
// //       {/* All protected routes now use the same robust ProtectedRoute component */}
// //       <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
// //       <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
// //       <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
// //       <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      
// //       <Route path="*" element={<Navigate to="/profile" />} />
// //     </Routes>
// //   );
// // }

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
// //         <Header />
// //         <div className="main-content">
// //             <AppRoutes />
// //         </div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Import Pages and Components
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import VerifyEmail from './pages/VerifyEmail';
// import CompleteProfile from './pages/CompleteProfile';
// import Discover from './pages/Discover';
// import Notifications from './pages/Notifications';
// import Header from './components/Header';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './styles/Auth.module.css'; // For the loader

// // This component is now the central gatekeeper for your application
// function ProtectedRoute({ children }) {
//   const { currentUser, isProfileComplete, loading } = useAuth();

//   // 1. While the auth state is loading, show a loading spinner
//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loader} style={{borderTopColor: 'var(--primary-color)'}}></div>
//       </div>
//     );
//   }

//   // 2. If not loading and no user, redirect to login
//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }
  
//   // 3. If user exists but their email is not verified, redirect to verify page
//   if (currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified) {
//     return <Navigate to="/verify-email" />;
//   }

//   // 4. This is the key logic:
//   // If user is verified but their profile is incomplete, force them to the complete-profile page
//   if (!isProfileComplete) {
//     // Allow access ONLY to the complete-profile page itself
//     return children.type === CompleteProfile ? children : <Navigate to="/complete-profile" />;
//   }

//   // 5. If a user with a complete profile tries to visit login/signup, send them to their profile
//   if (children.type === Login || children.type === Signup) {
//       return <Navigate to="/profile" />;
//   }

//   // 6. If all checks pass, render the requested page
//   return children;
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public routes that are still handled by ProtectedRoute to redirect logged-in users */}
//       <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
//       <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
//       <Route path="/verify-email" element={<VerifyEmail />} />
      
//       {/* All main app routes are now protected */}
//       <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
//       <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//       <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
//       <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      
//       {/* Default route for any unknown path */}
//       <Route path="*" element={<Navigate to="/profile" />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//         <Header />
//         <div className="main-content">
//             <AppRoutes />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import Pages and Components
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import CompleteProfile from './pages/CompleteProfile';
import Discover from './pages/Discover';
import Notifications from './pages/Notifications';
import Header from './components/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Auth.module.css';

// --- NEW: A separate component for routes accessible only to logged-out users ---
function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div className={styles.container}><div className={styles.loader} style={{borderTopColor: 'var(--primary-color)'}}></div></div>;
  }
  return currentUser ? <Navigate to="/profile" /> : children;
}

// --- UPDATED: ProtectedRoute is now simpler and more focused ---
function ProtectedRoute({ children }) {
  const { currentUser, isProfileComplete, loading } = useAuth();

  if (loading) {
    return <div className={styles.container}><div className={styles.loader} style={{borderTopColor: 'var(--primary-color)'}}></div></div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  if (!isProfileComplete) {
    return children.type === CompleteProfile ? children : <Navigate to="/complete-profile" />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      
      {/* This route is special as it's for users who are logged in but not verified */}
      <Route path="/verify-email" element={<VerifyEmail />} />
      
      {/* Protected Routes */}
      <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      
      {/* Default route */}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Header />
        <div className="main-content">
            <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
