// // // import User from "../models/User.model.js";

// // // // ... (syncUser and updateUserProfile functions remain the same) ...

// // // export const syncUser = async (req, res) => {
// // //   try {
// // //     const { uid, email, name } = req.user;
// // //     const user = await User.findOneAndUpdate(
// // //       { uid: uid },
// // //       {
// // //         $setOnInsert: {
// // //           uid: uid,
// // //           email: email,
// // //           username: name,
// // //           emailVerified: true,
// // //         },
// // //       },
// // //       {
// // //         upsert: true,
// // //         new: true,
// // //         setDefaultsOnInsert: true,
// // //       }
// // //     );
// // //     res.status(200).json(user);
// // //   } catch (error) {
// // //     if (error.code === 11000) {
// // //         return res.status(409).json({ message: 'A user with this name already exists.' });
// // //     }
// // //     console.error('Error syncing user:', error);
// // //     res.status(500).json({ message: 'Error syncing user' });
// // //   }
// // // };

// // // export const updateUserProfile = async (req, res) => {
// // //   try {
// // //     const { uid } = req.user;
// // //     const { gender, selectedInterests, phoneVerified, kycPhotoURL } = req.body;

// // //     if (selectedInterests && (!Array.isArray(selectedInterests) || selectedInterests.length < 3)) {
// // //       return res.status(400).json({ message: 'You must select at least 3 interests.' });
// // //     }

// // //     const updateData = {};
// // //     if (gender) updateData.gender = gender;
// // //     if (selectedInterests) updateData.selectedInterests = selectedInterests;
// // //     if (phoneVerified) updateData.phoneVerified = phoneVerified;
// // //     if (kycPhotoURL) updateData.kycPhotoURL = kycPhotoURL;


// // //     const updatedUser = await User.findOneAndUpdate(
// // //       { uid: uid },
// // //       { $set: updateData },
// // //       { new: true, runValidators: true }
// // //     );

// // //     if (!updatedUser) {
// // //       return res.status(4404).json({ message: 'User not found.' });
// // //     }
// // //     res.status(200).json(updatedUser);
// // //   } catch (error) {
// // //     if (error.name === 'ValidationError') {
// // //       return res.status(400).json({ message: error.message });
// // //     }
// // //     console.error('Error updating user profile:', error);
// // //     res.status(500).json({ message: 'Error updating user profile' });
// // //   }
// // // };

// // // export const uploadKycImage = async (req, res) => {
// // //     try {
// // //         if (!req.file) {
// // //             return res.status(400).json({ message: 'No image file provided.' });
// // //         }
// // //         const { uid } = req.user;
// // //         const kycPhotoURL = req.file.path;
// // //         const updatedUser = await User.findOneAndUpdate(
// // //             { uid: uid },
// // //             { $set: { kycPhotoURL: kycPhotoURL, kycVerified: true } },
// // //             { new: true }
// // //         );
// // //         if (!updatedUser) {
// // //             return res.status(404).json({ message: 'User not found.' });
// // //         }
// // //         res.status(200).json({ 
// // //             message: 'Image uploaded successfully!', 
// // //             kycPhotoURL: kycPhotoURL,
// // //             user: updatedUser 
// // //         });
// // //     } catch (error) {
// // //         console.error('Error uploading KYC image:', error);
// // //         res.status(500).json({ message: 'Error uploading image.' });
// // //     }
// // // };

// // // // --- NEW CONTROLLER FUNCTION for FCM ---
// // // export const addFcmToken = async (req, res) => {
// // //     try {
// // //         const { uid } = req.user;
// // //         const { token } = req.body;

// // //         if (!token) {
// // //             return res.status(400).json({ message: 'FCM token is required.' });
// // //         }

// // //         // Use $addToSet to add the token to the array only if it's not already present
// // //         const updatedUser = await User.findOneAndUpdate(
// // //             { uid: uid },
// // //             { $addToSet: { fcmTokens: token } },
// // //             { new: true }
// // //         );

// // //         if (!updatedUser) {
// // //             return res.status(404).json({ message: 'User not found.' });
// // //         }

// // //         res.status(200).json({ message: 'FCM token saved successfully.' });

// // //     } catch (error) {
// // //         console.error('Error adding FCM token:', error);
// // //         res.status(500).json({ message: 'Error saving FCM token.' });
// // //     }
// // // };



// // // Add this new function to your existing user.controller.js file

// // /**
// //  * @description Get user suggestions based on shared interests.
// //  * @route GET /api/users/suggestions
// //  * @access Private
// //  */
// // export const getUserSuggestions = async (req, res) => {
// //   try {
// //       const { uid } = req.user;

// //       // 1. Find the current user's profile to get their interests
// //       const currentUser = await User.findOne({ uid });
// //       if (!currentUser || !currentUser.selectedInterests || currentUser.selectedInterests.length === 0) {
// //           return res.status(400).json({ message: 'Complete your profile to get suggestions.' });
// //       }

// //       // 2. Find other users who share at least one interest and exclude the current user
// //       const suggestions = await User.find({
// //           selectedInterests: { $in: currentUser.selectedInterests },
// //           uid: { $ne: uid } 
// //       }).limit(20);

// //       // 3. Rank suggestions by the number of shared interests
// //       const rankedSuggestions = suggestions.map(user => {
// //           const commonInterests = user.selectedInterests.filter(interest => 
// //               currentUser.selectedInterests.includes(interest)
// //           );
// //           return {
// //               ...user.toObject(),
// //               commonInterestsCount: commonInterests.length,
// //               commonInterests: commonInterests
// //           };
// //       }).sort((a, b) => b.commonInterestsCount - a.commonInterestsCount);

// //       res.status(200).json(rankedSuggestions);

// //   } catch (error) {
// //       console.error('Error getting user suggestions:', error);
// //       res.status(500).json({ message: 'Error getting suggestions.' });
// //   }
// // };




// import User from "../models/User.model.js";

// // Your existing controller functions
// export const syncUser = async (req, res) => {
//   try {
//     const { uid, email, name } = req.user;
//     const user = await User.findOneAndUpdate(
//       { uid: uid },
//       {
//         $setOnInsert: {
//           uid: uid,
//           email: email,
//           username: name,
//           emailVerified: true,
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//         setDefaultsOnInsert: true,
//       }
//     );
//     res.status(200).json(user);
//   } catch (error) {
//     if (error.code === 11000) {
//         return res.status(409).json({ message: 'A user with this name already exists.' });
//     }
//     console.error('Error syncing user:', error);
//     res.status(500).json({ message: 'Error syncing user' });
//   }
// };

// export const updateUserProfile = async (req, res) => {
//   try {
//     const { uid } = req.user;
//     const { gender, selectedInterests, phoneVerified, kycPhotoURL } = req.body;
//     const updateData = {};
//     if (gender) updateData.gender = gender;
//     if (selectedInterests) updateData.selectedInterests = selectedInterests;
//     if (phoneVerified) updateData.phoneVerified = phoneVerified;
//     if (kycPhotoURL) updateData.kycPhotoURL = kycPhotoURL;
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
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ message: error.message });
//     }
//     console.error('Error updating user profile:', error);
//     res.status(500).json({ message: 'Error updating user profile' });
//   }
// };

// export const uploadKycImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No image file provided.' });
//         }
//         const { uid } = req.user;
//         const kycPhotoURL = req.file.path;
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
//             kycPhotoURL: kycPhotoURL,
//             user: updatedUser 
//         });
//     } catch (error) {
//         console.error('Error uploading KYC image:', error);
//         res.status(500).json({ message: 'Error uploading image.' });
//     }
// };

// // --- ADD THIS FUNCTION ---
// export const addFcmToken = async (req, res) => {
//     try {
//         const { uid } = req.user;
//         const { token } = req.body;
//         if (!token) {
//             return res.status(400).json({ message: 'FCM token is required.' });
//         }
//         await User.findOneAndUpdate(
//             { uid: uid },
//             { $addToSet: { fcmTokens: token } }
//         );
//         res.status(200).json({ message: 'FCM token saved successfully.' });
//     } catch (error) {
//         console.error('Error adding FCM token:', error);
//         res.status(500).json({ message: 'Error saving FCM token.' });
//     }
// };

// // --- AND ADD THIS FUNCTION ---
// export const getUserSuggestions = async (req, res) => {
//     try {
//         const { uid } = req.user;
//         const currentUser = await User.findOne({ uid });
//         if (!currentUser || !currentUser.selectedInterests || currentUser.selectedInterests.length === 0) {
//             return res.status(400).json({ message: 'Complete your profile to get suggestions.' });
//         }
//         const suggestions = await User.find({
//             selectedInterests: { $in: currentUser.selectedInterests },
//             uid: { $ne: uid }
//         }).limit(20);
//         const rankedSuggestions = suggestions.map(user => {
//             const commonInterests = user.selectedInterests.filter(interest => 
//                 currentUser.selectedInterests.includes(interest)
//             );
//             return {
//                 ...user.toObject(),
//                 commonInterestsCount: commonInterests.length,
//                 commonInterests: commonInterests
//             };
//         }).sort((a, b) => b.commonInterestsCount - a.commonInterestsCount);
//         res.status(200).json(rankedSuggestions);
//     } catch (error) {
//         console.error('Error getting user suggestions:', error);
//         res.status(500).json({ message: 'Error getting suggestions.' });
//     }
// };


import User from "../models/User.model.js";

// Your existing controller functions
export const syncUser = async (req, res) => {
  try {
    const { uid, email, name } = req.user;
    const user = await User.findOneAndUpdate(
      { uid: uid },
      {
        $setOnInsert: {
          uid: uid,
          email: email,
          username: name,
          emailVerified: true,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
        return res.status(409).json({ message: 'A user with this name already exists.' });
    }
    console.error('Error syncing user:', error);
    res.status(500).json({ message: 'Error syncing user' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const { gender, selectedInterests, phoneVerified, kycPhotoURL } = req.body;
    const updateData = {};
    if (gender) updateData.gender = gender;
    if (selectedInterests) updateData.selectedInterests = selectedInterests;
    if (phoneVerified) updateData.phoneVerified = phoneVerified;
    if (kycPhotoURL) updateData.kycPhotoURL = kycPhotoURL;
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
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

export const uploadKycImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided.' });
        }
        const { uid } = req.user;
        const kycPhotoURL = req.file.path;
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
            kycPhotoURL: kycPhotoURL,
            user: updatedUser 
        });
    } catch (error) {
        console.error('Error uploading KYC image:', error);
        res.status(500).json({ message: 'Error uploading image.' });
    }
};

export const addFcmToken = async (req, res) => {
    try {
        const { uid } = req.user;
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'FCM token is required.' });
        }
        await User.findOneAndUpdate(
            { uid: uid },
            { $addToSet: { fcmTokens: token } }
        );
        res.status(200).json({ message: 'FCM token saved successfully.' });
    } catch (error) {
        console.error('Error adding FCM token:', error);
        res.status(500).json({ message: 'Error saving FCM token.' });
    }
};

// --- UPDATED FUNCTION with Pagination ---
export const getUserSuggestions = async (req, res) => {
    try {
        const { uid } = req.user;
        // Get page and limit from query params, with default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10
        const skip = (page - 1) * limit;

        const currentUser = await User.findOne({ uid });
        if (!currentUser || !currentUser.selectedInterests || currentUser.selectedInterests.length === 0) {
            return res.status(400).json({ message: 'Complete your profile to get suggestions.' });
        }

        const query = {
            selectedInterests: { $in: currentUser.selectedInterests },
            uid: { $ne: uid }
        };

        // Fetch the paginated suggestions
        const suggestions = await User.find(query).skip(skip).limit(limit);
        
        // Get the total count of documents that match the query
        const total = await User.countDocuments(query);

        const rankedSuggestions = suggestions.map(user => {
            const commonInterests = user.selectedInterests.filter(interest => 
                currentUser.selectedInterests.includes(interest)
            );
            return {
                ...user.toObject(),
                commonInterestsCount: commonInterests.length,
                commonInterests: commonInterests
            };
        }).sort((a, b) => b.commonInterestsCount - a.commonInterestsCount);

        // Return the suggestions along with pagination info
        res.status(200).json({
            suggestions: rankedSuggestions,
            total,
            page,
            limit,
            hasNextPage: skip + rankedSuggestions.length < total
        });

    } catch (error) {
        console.error('Error getting user suggestions:', error);
        res.status(500).json({ message: 'Error getting suggestions.' });
    }
};
