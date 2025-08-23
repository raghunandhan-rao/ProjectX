
// import express from "express";
// import multer from 'multer';
// import { syncUser, updateUserProfile, uploadKycImage, addFcmToken } from "../controllers/user.controller.js";
// import verifyFirebaseToken from "../middleware/auth.middleware.js";
// import cloudinaryStorage from '../config/cloudinary.js';

// const router = express.Router();
// const upload = multer({ storage: cloudinaryStorage });

// router.post("/sync", verifyFirebaseToken, syncUser);
// router.patch("/profile", verifyFirebaseToken, updateUserProfile);
// router.post("/upload-kyc", verifyFirebaseToken, upload.single('kycImage'), uploadKycImage);

// // --- NEW ROUTE for FCM Token ---
// router.post("/fcm-token", verifyFirebaseToken, addFcmToken);

// export default router;



import express from "express";
import multer from 'multer';
import { 
    syncUser, 
    updateUserProfile, 
    uploadKycImage, 
    addFcmToken,
    getUserSuggestions // 1. Import the new controller
} from "../controllers/user.controller.js";
import verifyFirebaseToken from "../middleware/auth.middleware.js";
import cloudinaryStorage from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage: cloudinaryStorage });

router.post("/sync", verifyFirebaseToken, syncUser);
router.patch("/profile", verifyFirebaseToken, updateUserProfile);
router.post("/upload-kyc", verifyFirebaseToken, upload.single('kycImage'), uploadKycImage);
router.post("/fcm-token", verifyFirebaseToken, addFcmToken);

// 2. --- ADD THIS NEW ROUTE ---
router.get("/suggestions", verifyFirebaseToken, getUserSuggestions);

export default router;
