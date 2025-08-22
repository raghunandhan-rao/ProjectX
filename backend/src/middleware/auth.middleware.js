// import admin from 'firebase-admin';

// const verifyFirebaseToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(403).send('Unauthorized: No token provided.');
//   }
  
//   const idToken = authHeader.split('Bearer ')[1];
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken; // Add user data (uid, email) to the request object
//     next(); // Continue to the next step (the controller)
//   } catch (error) {
//     console.error('Error verifying Firebase ID token:', error);
//     res.status(403).send('Unauthorized: Invalid token.');
//   }
// };

// export default verifyFirebaseToken;


import admin from 'firebase-admin';

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send('Unauthorized: No token provided.');
  }
  
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized: Invalid token.');
  }
};

export default verifyFirebaseToken;