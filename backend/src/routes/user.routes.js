// import express from "express";
// import { syncUser } from "../controllers/user.controller.js";
// import verifyFirebaseToken from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Defines the POST /api/users/sync endpoint
// // It is protected by the verification middleware
// router.post("/sync", verifyFirebaseToken, syncUser);

// export default router;



import express from "express";
import { syncUser } from "../controllers/user.controller.js";
import verifyFirebaseToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sync", verifyFirebaseToken, syncUser);

export default router;