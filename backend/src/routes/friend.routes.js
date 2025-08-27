import express from "express";
import { 
    sendFriendRequest, 
    getFriendRequests, 
    acceptFriendRequest, 
    rejectFriendRequest 
} from "../controllers/friend.controller.js";
import verifyFirebaseToken from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes in this file are protected
router.use(verifyFirebaseToken);

router.post('/request/:userId', sendFriendRequest);
router.get('/requests', getFriendRequests);
router.post('/accept/:requestId', acceptFriendRequest);
router.post('/reject/:requestId', rejectFriendRequest);

export default router;
