// // // // import React from 'react';
// // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // import { AuthProvider, useAuth } from './contexts/AuthContext';

// // // // // Import your pages and components
// // // // import Signup from './pages/Signup';
// // // // import Login from './pages/Login';
// // // // import Profile from './pages/Profile';

// // // // // Import react-toastify for notifications
// // // // import { ToastContainer } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';

// // // // // Helper component to protect routes that require authentication
// // // // function ProtectedRoute({ children }) {
// // // //   const { currentUser } = useAuth();
// // // //   // If no user is logged in, redirect them to the login page
// // // //   return currentUser ? children : <Navigate to="/login" />;
// // // // }

// // // // // Component to handle all the application routes
// // // // function AppRoutes() {
// // // //     const { currentUser } = useAuth();
// // // //     return (
// // // //         <Routes>
// // // //             {/* If a user is already logged in, redirect them from login/signup to their profile */}
// // // //             <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
// // // //             <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
            
// // // //             {/* The profile page is protected */}
// // // //             <Route 
// // // //                 path="/profile" 
// // // //                 element={
// // // //                     <ProtectedRoute>
// // // //                         <Profile />
// // // //                     </ProtectedRoute>
// // // //                 } 
// // // //             />
            
// // // //             {/* Any other URL will redirect to the profile page as a default */}
// // // //             <Route path="*" element={<Navigate to="/profile" />} />
// // // //         </Routes>
// // // //     );
// // // // }

// // // // // The main App component that ties everything together
// // // // function App() {
// // // //   return (
// // // //     <AuthProvider>
// // // //       <Router>
// // // //         {/* This container is necessary for toast notifications to appear */}
// // // //         <ToastContainer
// // // //           position="top-right"
// // // //           autoClose={5000}
// // // //           hideProgressBar={false}
// // // //           newestOnTop={false}
// // // //           closeOnClick
// // // //           rtl={false}
// // // //           pauseOnFocusLoss
// // // //           draggable
// // // //           pauseOnHover
// // // //           theme="light"
// // // //         />
// // // //         <AppRoutes />
// // // //       </Router>
// // // //     </AuthProvider>
// // // //   );
// // // // }

// // // // export default App;



// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { AuthProvider, useAuth } from './contexts/AuthContext';

// // // import Signup from './pages/Signup';
// // // import Login from './pages/Login';
// // // import Profile from './pages/Profile';

// // // import { ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';

// // // // Protects routes that require a user to be logged in
// // // function ProtectedRoute({ children }) {
// // //   const { currentUser } = useAuth();
// // //   return currentUser ? children : <Navigate to="/login" />;
// // // }

// // // // Defines all application routes
// // // function AppRoutes() {
// // //     const { currentUser } = useAuth();
// // //     return (
// // //         <Routes>
// // //             <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
// // //             <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
// // //             <Route 
// // //                 path="/profile" 
// // //                 element={
// // //                     <ProtectedRoute>
// // //                         <Profile />
// // //                     </ProtectedRoute>
// // //                 } 
// // //             />
// // //             <Route path="*" element={<Navigate to="/profile" />} />
// // //         </Routes>
// // //     );
// // // }

// // // // The main App component
// // // function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <Router>
// // //         <ToastContainer
// // //           position="top-right"
// // //           autoClose={3000}
// // //           hideProgressBar={false}
// // //         />
// // //         <AppRoutes />
// // //       </Router>
// // //     </AuthProvider>
// // //   );
// // // }

// // // export default App;


// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { AuthProvider, useAuth } from './contexts/AuthContext';

// // import Signup from './pages/Signup';
// // import Login from './pages/Login';
// // import Profile from './pages/Profile';
// // import VerifyEmail from './pages/VerifyEmail'; // 1. Import the new page

// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // // 2. Update ProtectedRoute
// // function ProtectedRoute({ children }) {
// //   const { currentUser } = useAuth();
  
// //   if (!currentUser) {
// //     return <Navigate to="/login" />;
// //   }
  
// //   // If the user is logged in but their email is not verified, send them to the verify page
// //   if (!currentUser.emailVerified) {
// //     return <Navigate to="/verify-email" />;
// //   }

// //   return children;
// // }

// // function AppRoutes() {
// //     const { currentUser } = useAuth();
// //     return (
// //         <Routes>
// //             <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
// //             <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
// //             <Route path="/verify-email" element={<VerifyEmail />} /> {/* 3. Add the route for the verify page */}
            
// //             <Route 
// //                 path="/profile" 
// //                 element={
// //                     <ProtectedRoute>
// //                         <Profile />
// //                     </ProtectedRoute>
// //                 } 
// //             />
            
// //             <Route path="*" element={<Navigate to="/profile" />} />
// //         </Routes>
// //     );
// // }

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <ToastContainer position="top-right" autoClose={3000} />
// //         <AppRoutes />
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import VerifyEmail from './pages/VerifyEmail';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ProtectedRoute({ children }) {
//   const { currentUser } = useAuth();
//   if (!currentUser) return <Navigate to="/login" />;
//   if (!currentUser.emailVerified) return <Navigate to="/verify-email" />;
//   return children;
// }

// function AppRoutes() {
//     const { currentUser } = useAuth();
//     return (
//         <Routes>
//             <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
//             <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
//             <Route path="/verify-email" element={<VerifyEmail />} />
//             <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//             <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//     );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//         <AppRoutes />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified) {
    return <Navigate to="/verify-email" />;
  }
  return children;
}

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <Signup />} />
      <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;