



// import User from "../models/User.model.js";
// import Friendship from "../models/Friendship.model.js";
// import FriendRequest from "../models/FriendRequest.model.js";
// import { nanoid } from "nanoid";
// import admin from 'firebase-admin';
// import { cascadeDeleteUser } from '../middleware/cascadeDelete.middleware.js';

// /**
//  * @description Syncs a Firebase user to MongoDB or creates a new one.
//  * Uses the email prefix as a temporary, unique username.
//  * @route POST /api/users/sync
//  */
// export const syncUser = async (req, res) => {
//   try {
//     const { uid, email } = req.user;
//     const tempUsername = `${email.split('@')[0]}_${nanoid(4)}`;
//     const user = await User.findOneAndUpdate(
//       { uid: uid },
//       {
//         $setOnInsert: {
//           uid: uid,
//           email: email,
//           username: tempUsername, // Temporary unique username
//           emailVerified: true,
//         },
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error syncing user:', error);
//     res.status(500).json({ message: 'Error syncing user' });
//   }
// };

// /**
//  * @description Updates a user's profile with their chosen username and optional data.
//  * @route PATCH /api/users/profile
//  */
// export const updateUserProfile = async (req, res) => {
//   try {
//     const { uid } = req.user;
//     const { username, gender, selectedInterests } = req.body;

//     if (!username) {
//         return res.status(400).json({ message: 'Username is required.' });
//     }
//     if (!selectedInterests || selectedInterests.length < 3) {
//         return res.status(400).json({ message: 'Please select at least 3 interests.' });
//     }

//     const updateData = { username, gender, selectedInterests };
    
//     const updatedUser = await User.findOneAndUpdate(
//       { uid: uid },
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     if (error.code === 11000) {
//         return res.status(409).json({ message: 'This username is already taken.' });
//     }
//     console.error('Error updating user profile:', error);
//     res.status(500).json({ message: 'Error updating user profile' });
//   }
// };

// /**
//  * @description Handles KYC image upload via Cloudinary and updates the user profile.
//  * @route POST /api/users/upload-kyc
//  */
// export const uploadKycImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No image file provided.' });
//         }
//         const { uid } = req.user;
//         const kycPhotoURL = req.file.path; // URL from Cloudinary
//         const updatedUser = await User.findOneAndUpdate(
//             { uid: uid },
//             { $set: { kycPhotoURL: kycPhotoURL, kycVerified: true } },
//             { new: true }
//         );
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found.' });
//         }
//         res.status(200).json({ 
//             message: 'Image uploaded successfully!', 
//             user: updatedUser 
//         });
//     } catch (error) {
//         console.error('Error uploading KYC image:', error);
//         res.status(500).json({ message: 'Error uploading image.' });
//     }
// };

// /**
//  * @description Adds a new FCM token to the user's profile.
//  * @route POST /api/users/fcm-token
//  */
// export const addFcmToken = async (req, res) => {
//     try {
//         const { uid } = req.user;
//         const { token } = req.body;
//         if (!token) {
//             return res.status(400).json({ message: 'FCM token is required.' });
//         }
//         await User.findOneAndUpdate(
//             { uid: uid },
//             { $addToSet: { fcmTokens: token } } // $addToSet prevents duplicates
//         );
//         res.status(200).json({ message: 'FCM token saved successfully.' });
//     } catch (error) {
//         console.error('Error adding FCM token:', error);
//         res.status(500).json({ message: 'Error saving FCM token.' });
//     }
// };

// /**
//  * @description Gets paginated user suggestions based on shared interests.
//  * @route GET /api/users/suggestions
//  */
// export const getUserSuggestions = async (req, res) => {
//     try {
//         const currentUser = await User.findOne({ uid: req.user.uid });
        
//         // Find IDs of users who are already friends
//         const friendships = await Friendship.find({ users: currentUser._id });
//         const friendIds = friendships.map(f => f.users.find(id => !id.equals(currentUser._id)));

//         // Find IDs of users with pending sent/received requests
//         const requests = await FriendRequest.find({ 
//             $or: [{ from: currentUser._id }, { to: currentUser._id }],
//         });
//         const requestIds = requests.map(r => r.from.equals(currentUser._id) ? r.to : r.from);
        
//         const excludeIds = [currentUser._id, ...friendIds, ...requestIds];

//         const suggestions = await User.find({
//             selectedInterests: { $in: currentUser.selectedInterests },
//             _id: { $nin: excludeIds }
//         }).limit(10);

//         const rankedSuggestions = suggestions.map(user => {
//             const commonInterests = user.selectedInterests.filter(interest => 
//                 currentUser.selectedInterests.includes(interest)
//             );
//             return {
//                 ...user.toObject(),
//                 commonInterestsCount: commonInterests.length,
//                 commonInterests
//             };
//         }).sort((a, b) => b.commonInterestsCount - a.commonInterestsCount);

//         res.status(200).json({ suggestions: rankedSuggestions });

//     } catch (error) {
//         console.error('Error getting user suggestions:', error);
//         res.status(500).json({ message: 'Error getting suggestions.' });
//     }
// };

// /**
//  * @description Deletes a user's account and all associated data.
//  * @route DELETE /api/users/
//  * @access Private
//  */
// export const deleteUserAccount = async (req, res) => {
//     try {
//         const { uid } = req.user;

//         // 1. Find the user in MongoDB to get their internal _id
//         const user = await User.findOne({ uid });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found in database.' });
//         }
//         const userId = user._id;

//         // 2. Delete the user from Firebase Authentication
//         await admin.auth().deleteUser(uid);

//         // 3. Trigger our cascade delete middleware to clean up the database
//         await cascadeDeleteUser(userId);

//         // 4. Finally, delete the user document from MongoDB
//         await User.deleteOne({ _id: userId });

//         res.status(200).json({ message: 'User account deleted successfully.' });

//     } catch (error) {
//         console.error('Error deleting user account:', error);
//         res.status(500).json({ message: 'Failed to delete user account.' });
//     }
// };






import User from "../models/User.model.js";
import Friendship from "../models/Friendship.model.js";
import FriendRequest from "../models/FriendRequest.model.js";
import { nanoid } from "nanoid";
import admin from 'firebase-admin';
import { cascadeDeleteUser } from '../middleware/cascadeDelete.middleware.js';

/**
 * @description Syncs a Firebase user to MongoDB or creates a new one.
 * Uses the email prefix as a temporary, unique username.
 * @route POST /api/users/sync
 */
export const syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user;
    // Create a temporary, unique username until the user sets their own
    const tempUsername = `${email.split('@')[0]}_${nanoid(4)}`;
    const user = await User.findOneAndUpdate(
      { uid: uid },
      {
        $setOnInsert: {
          uid: uid,
          email: email,
          username: tempUsername, // Temporary unique username
          emailVerified: true,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ message: 'Error syncing user' });
  }
};

/**
 * @description Updates a user's profile with their chosen username and optional data.
 * @route PATCH /api/users/profile
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const { username, gender, selectedInterests } = req.body;

    // Both username and interests are now required for this step
    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }
    if (!selectedInterests || selectedInterests.length < 3) {
        return res.status(400).json({ message: 'Please select at least 3 interests.' });
    }

    const updateData = { username, gender, selectedInterests };
    
    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle duplicate username error from the database
    if (error.code === 11000) {
        return res.status(409).json({ message: 'This username is already taken.' });
    }
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

/**
 * @description Handles KYC image upload via Cloudinary and updates the user profile.
 * @route POST /api/users/upload-kyc
 */
export const uploadKycImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided.' });
        }
        const { uid } = req.user;
        const kycPhotoURL = req.file.path; // URL from Cloudinary
        const updatedUser = await User.findOneAndUpdate(
            { uid: uid },
            { $set: { kycPhotoURL: kycPhotoURL, kycVerified: true } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ 
            message: 'Image uploaded successfully!', 
            user: updatedUser 
        });
    } catch (error) {
        console.error('Error uploading KYC image:', error);
        res.status(500).json({ message: 'Error uploading image.' });
    }
};

/**
 * @description Adds a new FCM token to the user's profile.
 * @route POST /api/users/fcm-token
 */
export const addFcmToken = async (req, res) => {
    try {
        const { uid } = req.user;
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'FCM token is required.' });
        }
        await User.findOneAndUpdate(
            { uid: uid },
            { $addToSet: { fcmTokens: token } } // $addToSet prevents duplicates
        );
        res.status(200).json({ message: 'FCM token saved successfully.' });
    } catch (error) {
        console.error('Error adding FCM token:', error);
        res.status(500).json({ message: 'Error saving FCM token.' });
    }
};

/**
 * @description Gets paginated user suggestions based on shared interests.
 * @route GET /api/users/suggestions
 */
export const getUserSuggestions = async (req, res) => {
    try {
        const currentUser = await User.findOne({ uid: req.user.uid });
        
        // Find IDs of users who are already friends
        const friendships = await Friendship.find({ users: currentUser._id });
        const friendIds = friendships.map(f => f.users.find(id => !id.equals(currentUser._id)));

        // Find IDs of users with pending sent/received requests
        const requests = await FriendRequest.find({ 
            $or: [{ from: currentUser._id }, { to: currentUser._id }],
        });
        const requestIds = requests.map(r => r.from.equals(currentUser._id) ? r.to : r.from);
        
        const excludeIds = [currentUser._id, ...friendIds, ...requestIds];

        const suggestions = await User.find({
            selectedInterests: { $in: currentUser.selectedInterests },
            _id: { $nin: excludeIds }
        }).limit(10);

        const rankedSuggestions = suggestions.map(user => {
            const commonInterests = user.selectedInterests.filter(interest => 
                currentUser.selectedInterests.includes(interest)
            );
            return {
                ...user.toObject(),
                commonInterestsCount: commonInterests.length,
                commonInterests
            };
        }).sort((a, b) => b.commonInterestsCount - a.commonInterestsCount);

        res.status(200).json({ suggestions: rankedSuggestions });

    } catch (error) {
        console.error('Error getting user suggestions:', error);
        res.status(500).json({ message: 'Error getting suggestions.' });
    }
};

/**
 * @description Deletes a user's account and all associated data.
 * @route DELETE /api/users/
 * @access Private
 */
export const deleteUserAccount = async (req, res) => {
    try {
        const { uid } = req.user;

        // 1. Find the user in MongoDB to get their internal _id
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found in database.' });
        }
        const userId = user._id;

        // 2. Delete the user from Firebase Authentication
        await admin.auth().deleteUser(uid);

        // 3. Trigger our cascade delete middleware to clean up the database
        await cascadeDeleteUser(userId);

        // 4. Finally, delete the user document from MongoDB
        await User.deleteOne({ _id: userId });

        res.status(200).json({ message: 'User account deleted successfully.' });

    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ message: 'Failed to delete user account.' });
    }
};
