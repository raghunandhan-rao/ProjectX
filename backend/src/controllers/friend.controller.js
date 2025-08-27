// // // import FriendRequest from '../models/FriendRequest.model.js';
// // // import Friendship from '../models/Friendship.model.js';
// // // import User from '../models/User.model.js';

// // // /**
// // //  * @description Send a friend request to another user.
// // //  * @route POST /api/friends/request/:userId
// // //  * @access Private
// // //  */
// // // export const sendFriendRequest = async (req, res) => {
// // //     try {
// // //         const fromUser = await User.findOne({ uid: req.user.uid });
// // //         const toUserId = req.params.userId;

// // //         // Check if a request already exists
// // //         const existingRequest = await FriendRequest.findOne({ from: fromUser._id, to: toUserId });
// // //         if (existingRequest) {
// // //             return res.status(400).json({ message: 'Friend request already sent.' });
// // //         }

// // //         const newRequest = new FriendRequest({ from: fromUser._id, to: toUserId });
// // //         await newRequest.save();

// // //         res.status(201).json({ message: 'Friend request sent successfully.' });
// // //     } catch (error) {
// // //         console.error('Error sending friend request:', error);
// // //         res.status(500).json({ message: 'Server error.' });
// // //     }
// // // };

// // // /**
// // //  * @description Get all incoming friend requests for the current user.
// // //  * @route GET /api/friends/requests
// // //  * @access Private
// // //  */
// // // export const getFriendRequests = async (req, res) => {
// // //     try {
// // //         const currentUser = await User.findOne({ uid: req.user.uid });
// // //         const requests = await FriendRequest.find({ to: currentUser._id, status: 'pending' })
// // //             .populate('from', 'username starRating'); // Populate sender's info

// // //         res.status(200).json(requests);
// // //     } catch (error) {
// // //         console.error('Error fetching friend requests:', error);
// // //         res.status(500).json({ message: 'Server error.' });
// // //     }
// // // };

// // // /**
// // //  * @description Accept a friend request.
// // //  * @route POST /api/friends/accept/:requestId
// // //  * @access Private
// // //  */
// // // export const acceptFriendRequest = async (req, res) => {
// // //     try {
// // //         const { requestId } = req.params;
// // //         const currentUser = await User.findOne({ uid: req.user.uid });

// // //         const request = await FriendRequest.findById(requestId);
// // //         if (!request || request.to.toString() !== currentUser._id.toString()) {
// // //             return res.status(404).json({ message: 'Request not found.' });
// // //         }

// // //         request.status = 'accepted';
// // //         await request.save();

// // //         // Create a new friendship document
// // //         const newFriendship = new Friendship({ users: [request.from, request.to] });
// // //         await newFriendship.save();

// // //         res.status(200).json({ message: 'Friend request accepted.' });
// // //     } catch (error) {
// // //         console.error('Error accepting friend request:', error);
// // //         res.status(500).json({ message: 'Server error.' });
// // //     }
// // // };

// // // /**
// // //  * @description Reject a friend request.
// // //  * @route POST /api/friends/reject/:requestId
// // //  * @access Private
// // //  */
// // // export const rejectFriendRequest = async (req, res) => {
// // //     try {
// // //         const { requestId } = req.params;
// // //         const currentUser = await User.findOne({ uid: req.user.uid });

// // //         const request = await FriendRequest.findById(requestId);
// // //         if (!request || request.to.toString() !== currentUser._id.toString()) {
// // //             return res.status(404).json({ message: 'Request not found.' });
// // //         }

// // //         request.status = 'rejected';
// // //         await request.save();

// // //         res.status(200).json({ message: 'Friend request rejected.' });
// // //     } catch (error) {
// // //         console.error('Error rejecting friend request:', error);
// // //         res.status(500).json({ message: 'Server error.' });
// // //     }
// // // };




// // import FriendRequest from '../models/FriendRequest.model.js';
// // import Friendship from '../models/Friendship.model.js';
// // import User from '../models/User.model.js';

// // /**
// //  * @description Send a friend request to another user.
// //  * @route POST /api/friends/request/:userId
// //  */
// // export const sendFriendRequest = async (req, res) => {
// //     try {
// //         const fromUser = await User.findOne({ uid: req.user.uid });
// //         const toUser = await User.findById(req.params.userId);

// //         if (!toUser) {
// //             return res.status(404).json({ message: 'User to send request to not found.' });
// //         }
// //         if (fromUser._id.equals(toUser._id)) {
// //             return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
// //         }

// //         const existingRequest = await FriendRequest.findOne({
// //             $or: [
// //                 { from: fromUser._id, to: toUser._id },
// //                 { from: toUser._id, to: fromUser._id }
// //             ]
// //         });
// //         if (existingRequest) {
// //             return res.status(400).json({ message: 'A friend request already exists between you and this user.' });
// //         }

// //         const newRequest = new FriendRequest({ from: fromUser._id, to: toUser._id });
// //         await newRequest.save();

// //         res.status(201).json({ message: 'Friend request sent successfully.' });
// //     } catch (error) {
// //         console.error('Error sending friend request:', error);
// //         res.status(500).json({ message: 'Server error while sending request.' });
// //     }
// // };

// // /**
// //  * @description Get all incoming friend requests for the current user.
// //  * @route GET /api/friends/requests
// //  */
// // export const getFriendRequests = async (req, res) => {
// //     try {
// //         const currentUser = await User.findOne({ uid: req.user.uid });
// //         if (!currentUser) {
// //             return res.status(404).json({ message: 'Your user profile was not found.' });
// //         }
// //         const requests = await FriendRequest.find({ to: currentUser._id, status: 'pending' })
// //             .populate('from', 'username starRating');

// //         res.status(200).json(requests);
// //     } catch (error) {
// //         console.error('Error fetching friend requests:', error);
// //         res.status(500).json({ message: 'Server error while fetching requests.' });
// //     }
// // };

// // /**
// //  * @description Accept a friend request.
// //  * @route POST /api/friends/accept/:requestId
// //  */
// // export const acceptFriendRequest = async (req, res) => {
// //     try {
// //         const { requestId } = req.params;
// //         const currentUser = await User.findOne({ uid: req.user.uid });

// //         if (!currentUser) {
// //             return res.status(404).json({ message: 'Your user profile was not found.' });
// //         }

// //         const request = await FriendRequest.findById(requestId);
// //         if (!request || !request.to.equals(currentUser._id)) {
// //             return res.status(404).json({ message: 'Request not found or you are not authorized.' });
// //         }
// //         if (request.status !== 'pending') {
// //             return res.status(400).json({ message: 'This request has already been handled.' });
// //         }

// //         request.status = 'accepted';
        
// //         const newFriendship = new Friendship({ users: [request.from, request.to] });
        
// //         // Use a transaction to ensure both operations succeed or fail together
// //         const session = await mongoose.startSession();
// //         await session.withTransaction(async () => {
// //             await request.save({ session });
// //             await newFriendship.save({ session });
// //         });
// //         session.endSession();

// //         res.status(200).json({ message: 'Friend request accepted.' });
// //     } catch (error) {
// //         if (error.code === 11000) {
// //             return res.status(409).json({ message: 'You are already friends with this user.' });
// //         }
// //         console.error('Error accepting friend request:', error);
// //         res.status(500).json({ message: 'Server error while accepting request.' });
// //     }
// // };

// // /**
// //  * @description Reject a friend request.
// //  * @route POST /api/friends/reject/:requestId
// //  */
// // export const rejectFriendRequest = async (req, res) => {
// //     try {
// //         const { requestId } = req.params;
// //         const currentUser = await User.findOne({ uid: req.user.uid });

// //         if (!currentUser) {
// //             return res.status(404).json({ message: 'Your user profile was not found.' });
// //         }

// //         const request = await FriendRequest.findById(requestId);
// //         if (!request || !request.to.equals(currentUser._id)) {
// //             return res.status(404).json({ message: 'Request not found or you are not authorized.' });
// //         }
// //         if (request.status !== 'pending') {
// //             return res.status(400).json({ message: 'This request has already been handled.' });
// //         }

// //         request.status = 'rejected';
// //         await request.save();

// //         res.status(200).json({ message: 'Friend request rejected.' });
// //     } catch (error) {
// //         console.error('Error rejecting friend request:', error);
// //         res.status(500).json({ message: 'Server error while rejecting request.' });
// //     }
// // };




// import mongoose from 'mongoose'; // This line was missing
// import FriendRequest from '../models/FriendRequest.model.js';
// import Friendship from '../models/Friendship.model.js';
// import User from '../models/User.model.js';

// /**
//  * @description Send a friend request to another user.
//  * @route POST /api/friends/request/:userId
//  */
// export const sendFriendRequest = async (req, res) => {
//     try {
//         const fromUser = await User.findOne({ uid: req.user.uid });
//         const toUser = await User.findById(req.params.userId);

//         if (!toUser) {
//             return res.status(404).json({ message: 'User to send request to not found.' });
//         }
//         if (fromUser._id.equals(toUser._id)) {
//             return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
//         }

//         const existingRequest = await FriendRequest.findOne({
//             $or: [
//                 { from: fromUser._id, to: toUser._id },
//                 { from: toUser._id, to: fromUser._id }
//             ]
//         });
//         if (existingRequest) {
//             return res.status(400).json({ message: 'A friend request already exists between you and this user.' });
//         }

//         const newRequest = new FriendRequest({ from: fromUser._id, to: toUser._id });
//         await newRequest.save();

//         res.status(201).json({ message: 'Friend request sent successfully.' });
//     } catch (error) {
//         console.error('Error sending friend request:', error);
//         res.status(500).json({ message: 'Server error while sending request.' });
//     }
// };

// /**
//  * @description Get all incoming friend requests for the current user.
//  * @route GET /api/friends/requests
//  */
// export const getFriendRequests = async (req, res) => {
//     try {
//         const currentUser = await User.findOne({ uid: req.user.uid });
//         if (!currentUser) {
//             return res.status(404).json({ message: 'Your user profile was not found.' });
//         }
//         const requests = await FriendRequest.find({ to: currentUser._id, status: 'pending' })
//             .populate('from', 'username starRating');

//         res.status(200).json(requests);
//     } catch (error) {
//         console.error('Error fetching friend requests:', error);
//         res.status(500).json({ message: 'Server error while fetching requests.' });
//     }
// };

// /**
//  * @description Accept a friend request.
//  * @route POST /api/friends/accept/:requestId
//  */
// export const acceptFriendRequest = async (req, res) => {
//     try {
//         const { requestId } = req.params;
//         const currentUser = await User.findOne({ uid: req.user.uid });

//         if (!currentUser) {
//             return res.status(404).json({ message: 'Your user profile was not found.' });
//         }

//         const request = await FriendRequest.findById(requestId);
//         if (!request || !request.to.equals(currentUser._id)) {
//             return res.status(404).json({ message: 'Request not found or you are not authorized.' });
//         }
//         if (request.status !== 'pending') {
//             return res.status(400).json({ message: 'This request has already been handled.' });
//         }

//         request.status = 'accepted';
        
//         const newFriendship = new Friendship({ users: [request.from, request.to] });
        
//         // Use a transaction to ensure both operations succeed or fail together
//         const session = await mongoose.startSession();
//         await session.withTransaction(async () => {
//             await request.save({ session });
//             await newFriendship.save({ session });
//         });
//         session.endSession();

//         res.status(200).json({ message: 'Friend request accepted.' });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(409).json({ message: 'You are already friends with this user.' });
//         }
//         console.error('Error accepting friend request:', error);
//         res.status(500).json({ message: 'Server error while accepting request.' });
//     }
// };

// /**
//  * @description Reject a friend request.
//  * @route POST /api/friends/reject/:requestId
//  */
// export const rejectFriendRequest = async (req, res) => {
//     try {
//         const { requestId } = req.params;
//         const currentUser = await User.findOne({ uid: req.user.uid });

//         if (!currentUser) {
//             return res.status(404).json({ message: 'Your user profile was not found.' });
//         }

//         const request = await FriendRequest.findById(requestId);
//         if (!request || !request.to.equals(currentUser._id)) {
//             return res.status(404).json({ message: 'Request not found or you are not authorized.' });
//         }
//         if (request.status !== 'pending') {
//             return res.status(400).json({ message: 'This request has already been handled.' });
//         }

//         request.status = 'rejected';
//         await request.save();

//         res.status(200).json({ message: 'Friend request rejected.' });
//     } catch (error) {
//         console.error('Error rejecting friend request:', error);
//         res.status(500).json({ message: 'Server error while rejecting request.' });
//     }
// };




import mongoose from 'mongoose'; // This line was missing
import FriendRequest from '../models/FriendRequest.model.js';
import Friendship from '../models/Friendship.model.js';
import User from '../models/User.model.js';

/**
 * @description Send a friend request to another user.
 * @route POST /api/friends/request/:userId
 */
export const sendFriendRequest = async (req, res) => {
    try {
        const fromUser = await User.findOne({ uid: req.user.uid });
        const toUser = await User.findById(req.params.userId);

        if (!toUser) {
            return res.status(404).json({ message: 'User to send request to not found.' });
        }
        if (fromUser._id.equals(toUser._id)) {
            return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { from: fromUser._id, to: toUser._id },
                { from: toUser._id, to: fromUser._id }
            ]
        });
        if (existingRequest) {
            return res.status(400).json({ message: 'A friend request already exists between you and this user.' });
        }

        const newRequest = new FriendRequest({ from: fromUser._id, to: toUser._id });
        await newRequest.save();

        res.status(201).json({ message: 'Friend request sent successfully.' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: 'Server error while sending request.' });
    }
};

/**
 * @description Get all incoming friend requests for the current user.
 * @route GET /api/friends/requests
 */
export const getFriendRequests = async (req, res) => {
    try {
        const currentUser = await User.findOne({ uid: req.user.uid });
        if (!currentUser) {
            return res.status(404).json({ message: 'Your user profile was not found.' });
        }
        const requests = await FriendRequest.find({ to: currentUser._id, status: 'pending' })
            .populate('from', 'username starRating');

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ message: 'Server error while fetching requests.' });
    }
};

/**
 * @description Accept a friend request.
 * @route POST /api/friends/accept/:requestId
 */
export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const currentUser = await User.findOne({ uid: req.user.uid });

        if (!currentUser) {
            return res.status(404).json({ message: 'Your user profile was not found.' });
        }

        const request = await FriendRequest.findById(requestId);
        if (!request || !request.to.equals(currentUser._id)) {
            return res.status(404).json({ message: 'Request not found or you are not authorized.' });
        }
        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'This request has already been handled.' });
        }

        request.status = 'accepted';
        
        const newFriendship = new Friendship({ users: [request.from, request.to] });
        
        // Use a transaction to ensure both operations succeed or fail together
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            await request.save({ session });
            await newFriendship.save({ session });
        });
        session.endSession();

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'You are already friends with this user.' });
        }
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Server error while accepting request.' });
    }
};

/**
 * @description Reject a friend request.
 * @route POST /api/friends/reject/:requestId
 */
export const rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const currentUser = await User.findOne({ uid: req.user.uid });

        if (!currentUser) {
            return res.status(404).json({ message: 'Your user profile was not found.' });
        }

        const request = await FriendRequest.findById(requestId);
        if (!request || !request.to.equals(currentUser._id)) {
            return res.status(404).json({ message: 'Request not found or you are not authorized.' });
        }
        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'This request has already been handled.' });
        }

        request.status = 'rejected';
        await request.save();

        res.status(200).json({ message: 'Friend request rejected.' });
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        res.status(500).json({ message: 'Server error while rejecting request.' });
    }
};
