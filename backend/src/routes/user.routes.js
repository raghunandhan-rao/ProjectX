

// // // import express from "express";
// // // import { syncUser } from "../controllers/user.controller.js";
// // // import verifyFirebaseToken from "../middleware/auth.middleware.js";

// // // const router = express.Router();

// // // router.post("/sync", verifyFirebaseToken, syncUser);

// // // export default router;


// // import express from "express";
// // import { syncUser, updateUserProfile } from "../controllers/user.controller.js";
// // import verifyFirebaseToken from "../middleware/auth.middleware.js";

// // const router = express.Router();

// // // Route to sync user on login/signup
// // router.post("/sync", verifyFirebaseToken, syncUser);

// // // --- NEW ROUTE ---
// // // Route to update the user's profile with optional data
// // router.patch("/profile", verifyFirebaseToken, updateUserProfile);

// // export default router;




// import express from "express";
// import multer from 'multer';
// import { syncUser, updateUserProfile, uploadKycImage } from "../controllers/user.controller.js";
// import verifyFirebaseToken from "../middleware/auth.middleware.js";
// import cloudinaryStorage from '../config/cloudinary.js'; // Import the Cloudinary storage config

// const router = express.Router();

// // Configure Multer to use the Cloudinary storage engine
// const upload = multer({ storage: cloudinaryStorage });

// // Route to sync user on login/signup
// router.post("/sync", verifyFirebaseToken, syncUser);

// // Route to update the user's profile with optional data
// router.patch("/profile", verifyFirebaseToken, updateUserProfile);

// // --- NEW ROUTE for KYC Image Upload ---
// // It uses three pieces of middleware:
// // 1. verifyFirebaseToken: Ensures the user is authenticated.
// // 2. upload.single('kycImage'): Handles the file upload via Multer and Cloudinary.
// // 3. uploadKycImage: The controller function that runs after the upload is complete.
// router.post("/upload-kyc", verifyFirebaseToken, upload.single('kycImage'), uploadKycImage);


// export default router;




import express from "express";
import multer from 'multer';
import { syncUser, updateUserProfile, uploadKycImage, addFcmToken } from "../controllers/user.controller.js";
import verifyFirebaseToken from "../middleware/auth.middleware.js";
import cloudinaryStorage from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage: cloudinaryStorage });

router.post("/sync", verifyFirebaseToken, syncUser);
router.patch("/profile", verifyFirebaseToken, updateUserProfile);
router.post("/upload-kyc", verifyFirebaseToken, upload.single('kycImage'), uploadKycImage);

// --- NEW ROUTE for FCM Token ---
router.post("/fcm-token", verifyFirebaseToken, addFcmToken);

export default router;
