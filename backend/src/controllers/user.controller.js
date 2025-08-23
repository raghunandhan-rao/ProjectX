// // // // // // import User from "../models/User.model.js";

// // // // // // // Handles the logic to sync a Firebase user to the MongoDB database
// // // // // // export const syncUser = async (req, res) => {
// // // // // //   try {
// // // // // //     const { uid, email, name } = req.user; // Data from the verified token

// // // // // //     // Creates a new user document if it doesn't exist,
// // // // // //     // or updates the existing one.
// // // // // //     const user = await User.findByIdAndUpdate(
// // // // // //       uid,
// // // // // //       { email, name },
// // // // // //       { upsert: true, new: true, setDefaultsOnInsert: true }
// // // // // //     );
    
// // // // // //     res.status(200).json(user);
// // // // // //   } catch (error) {
// // // // // //     console.error('Error syncing user:', error);
// // // // // //     res.status(500).json({ message: 'Error syncing user' });
// // // // // //   }
// // // // // // };



// // // // // import User from "../models/User.model.js";

// // // // // export const syncUser = async (req, res) => {
// // // // //   try {
// // // // //     const { uid, email, name } = req.user;
// // // // //     const user = await User.findByIdAndUpdate(
// // // // //       uid,
// // // // //       { email, name },
// // // // //       { upsert: true, new: true, setDefaultsOnInsert: true }
// // // // //     );
// // // // //     res.status(200).json(user);
// // // // //   } catch (error) {
// // // // //     console.error('Error syncing user:', error);
// // // // //     res.status(500).json({ message: 'Error syncing user' });
// // // // //   }
// // // // // };




// // // // import User from "../models/User.model.js";

// // // // // Handles the logic to sync a Firebase user to the MongoDB database
// // // // export const syncUser = async (req, res) => {
// // // //   try {
// // // //     const { uid, email, name, email_verified } = req.user;
// // // //     const user = await User.findOneAndUpdate(
// // // //       { uid: uid },
// // // //       { 
// // // //         username: name,
// // // //         email: email,
// // // //         'verification.emailVerified': email_verified,
// // // //       },
// // // //       { 
// // // //         upsert: true,
// // // //         new: true,
// // // //         setDefaultsOnInsert: true
// // // //       }
// // // //     );
// // // //     res.status(200).json(user);
// // // //   } catch (error) {
// // // //     console.error('Error syncing user:', error);
// // // //     res.status(500).json({ message: 'Error syncing user' });
// // // //   }
// // // // };

// // // // // --- NEW CONTROLLER FUNCTION ---
// // // // // Handles updating the user's optional profile information
// // // // export const updateUserProfile = async (req, res) => {
// // // //   try {
// // // //     const { uid } = req.user; // Get UID from the authenticated token
// // // //     const { gender, selectedInterests, kycPhotoURL, phone } = req.body;

// // // //     // Basic validation for interests
// // // //     if (selectedInterests && (!Array.isArray(selectedInterests) || selectedInterests.length < 3)) {
// // // //       return res.status(400).json({ message: 'You must select at least 3 interests.' });
// // // //     }

// // // //     // Find the user by their Firebase UID
// // // //     const user = await User.findOne({ uid: uid });
// // // //     if (!user) {
// // // //       return res.status(404).json({ message: 'User not found.' });
// // // //     }

// // // //     // Update the fields if they are provided in the request body
// // // //     if (gender) user.profile.gender = gender;
// // // //     if (kycPhotoURL) user.profile.kycPhotoURL = kycPhotoURL;
// // // //     if (selectedInterests) user.selectedInterests = selectedInterests;
// // // //     // Note: We are just saving the phone number. Actual verification would be a separate process.
// // // //     if (phone) user.verification.phoneVerified = true; // Assuming verification for now

// // // //     // Save the updated user document
// // // //     const updatedUser = await user.save();

// // // //     res.status(200).json(updatedUser);

// // // //   } catch (error) {
// // // //     // Handle potential validation errors from the schema
// // // //     if (error.name === 'ValidationError') {
// // // //       return res.status(400).json({ message: error.message });
// // // //     }
// // // //     console.error('Error updating user profile:', error);
// // // //     res.status(500).json({ message: 'Error updating user profile' });
// // // //   }
// // // // };




// // // import User from "../models/User.model.js";

// // // // Handles the logic to sync a Firebase user to the MongoDB database
// // // export const syncUser = async (req, res) => {
// // //   try {
// // //     const { uid, email, name, email_verified } = req.user;
// // //     const user = await User.findOneAndUpdate(
// // //       { uid: uid },
// // //       { 
// // //         username: name,
// // //         email: email,
// // //         'verification.emailVerified': email_verified,
// // //       },
// // //       { 
// // //         upsert: true,
// // //         new: true,
// // //         setDefaultsOnInsert: true
// // //       }
// // //     );
// // //     res.status(200).json(user);
// // //   } catch (error) {
// // //     console.error('Error syncing user:', error);
// // //     res.status(500).json({ message: 'Error syncing user' });
// // //   }
// // // };

// // // // --- UPDATED CONTROLLER FUNCTION ---
// // // // Handles updating the user's optional profile information
// // // export const updateUserProfile = async (req, res) => {
// // //   try {
// // //     const { uid } = req.user; // Get UID from the authenticated token
// // //     const { gender, selectedInterests, kycPhotoURL, phone } = req.body;

// // //     // Validate interests
// // //     if (selectedInterests && (!Array.isArray(selectedInterests) || selectedInterests.length < 3)) {
// // //       return res.status(400).json({ message: 'You must select at least 3 interests.' });
// // //     }

// // //     // Build an update object dynamically based on the data provided
// // //     const updateData = {};
// // //     // --- FIX: Removed the 'profile.' prefix to match your new schema ---
// // //     if (gender) updateData.gender = gender;
// // //     if (kycPhotoURL) updateData.kycPhotoURL = kycPhotoURL;
// // //     if (selectedInterests) updateData.selectedInterests = selectedInterests;
// // //     if (phone) updateData['verification.phoneVerified'] = true;

// // //     // Use findOneAndUpdate for a more direct and atomic update
// // //     const updatedUser = await User.findOneAndUpdate(
// // //       { uid: uid },
// // //       { $set: updateData }, // Use $set to update only the provided fields
// // //       { new: true, runValidators: true } // Options: return the new doc and run schema validation
// // //     );

// // //     if (!updatedUser) {
// // //       return res.status(404).json({ message: 'User not found.' });
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




// // import User from "../models/User.model.js";

// // /**
// //  * @description Syncs a Firebase user to MongoDB on their first login.
// //  * @route POST /api/users/sync
// //  * @access Private
// //  */
// // export const syncUser = async (req, res) => {
// //   try {
// //     const { uid, email, name } = req.user;

// //     // Find a user by their UID. If they don't exist, create a new document.
// //     // We use $setOnInsert to ensure we only write this data on creation.
// //     const user = await User.findOneAndUpdate(
// //       { uid: uid },
// //       {
// //         $setOnInsert: {
// //           uid: uid,
// //           email: email,
// //           username: name, // Using the name from the token as the initial username
// //           emailVerified: true, // This is always true as the user is authenticated
// //         },
// //       },
// //       {
// //         upsert: true, // Create the document if it doesn't exist
// //         new: true, // Return the new or found document
// //         setDefaultsOnInsert: true,
// //       }
// //     );

// //     res.status(200).json(user);
// //   } catch (error) {
// //     // This can happen if two users have the same 'name' from a provider
// //     if (error.code === 11000) {
// //         return res.status(409).json({ message: 'A user with this name already exists.' });
// //     }
// //     console.error('Error syncing user:', error);
// //     res.status(500).json({ message: 'Error syncing user' });
// //   }
// // };

// // /**
// //  * @description Updates a user's profile with optional data.
// //  * @route PATCH /api/users/profile
// //  * @access Private
// //  */
// // export const updateUserProfile = async (req, res) => {
// //   try {
// //     const { uid } = req.user; // Get UID from the authenticated token
// //     const { gender, selectedInterests, kycPhotoURL, phone } = req.body;

// //     // Validate that at least 3 interests are provided
// //     if (selectedInterests && (!Array.isArray(selectedInterests) || selectedInterests.length < 3)) {
// //       return res.status(400).json({ message: 'You must select at least 3 interests.' });
// //     }

// //     // Build an update object with only the fields provided in the request
// //     const updateData = {};
// //     if (gender) updateData.gender = gender;
// //     if (kycPhotoURL) updateData.kycPhotoURL = kycPhotoURL;
// //     if (selectedInterests) updateData.selectedInterests = selectedInterests;
// //     if (phone) updateData.phoneVerified = true; // Set phone as verified

// //     // Find the user by their UID and update their document
// //     const updatedUser = await User.findOneAndUpdate(
// //       { uid: uid },
// //       { $set: updateData }, // Use $set to update only the provided fields
// //       { new: true, runValidators: true } // Return the updated doc and run schema validation
// //     );

// //     if (!updatedUser) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     res.status(200).json(updatedUser);

// //   } catch (error) {
// //     // Handle Mongoose validation errors (e.g., failed enum check)
// //     if (error.name === 'ValidationError') {
// //       return res.status(400).json({ message: error.message });
// //     }
// //     console.error('Error updating user profile:', error);
// //     res.status(500).json({ message: 'Error updating user profile' });
// //   }
// // };





// import User from "../models/User.model.js";

// // ... (syncUser and updateUserProfile functions remain the same) ...

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
//     const { gender, selectedInterests, phoneVerified } = req.body;

//     if (selectedInterests && (!Array.isArray(selectedInterests) || selectedInterests.length < 3)) {
//       return res.status(400).json({ message: 'You must select at least 3 interests.' });
//     }

//     const updateData = {};
//     if (gender) updateData.gender = gender;
//     if (selectedInterests) updateData.selectedInterests = selectedInterests;
//     if (phoneVerified) updateData.phoneVerified = phoneVerified;

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


// // --- NEW CONTROLLER FUNCTION for Image Upload ---
// export const uploadKycImage = async (req, res) => {
//     try {
//         // After Multer and Cloudinary do their work, the file info is available on req.file
//         if (!req.file) {
//             return res.status(400).json({ message: 'No image file provided.' });
//         }

//         const { uid } = req.user;
//         const kycPhotoURL = req.file.path; // The secure URL from Cloudinary

//         // Update the user's document with the new photo URL
//         const updatedUser = await User.findOneAndUpdate(
//             { uid: uid },
//             { $set: { kycPhotoURL: kycPhotoURL, kycVerified: true } }, // Also set kycVerified to true
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         // Return the URL and the updated user profile
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




import User from "../models/User.model.js";

// ... (syncUser and updateUserProfile functions remain the same) ...

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

    if (selectedInterests && (!Array.isArray(selectedInterests) || selectedInterests.length < 3)) {
      return res.status(400).json({ message: 'You must select at least 3 interests.' });
    }

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
      return res.status(4404).json({ message: 'User not found.' });
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

// --- NEW CONTROLLER FUNCTION for FCM ---
export const addFcmToken = async (req, res) => {
    try {
        const { uid } = req.user;
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'FCM token is required.' });
        }

        // Use $addToSet to add the token to the array only if it's not already present
        const updatedUser = await User.findOneAndUpdate(
            { uid: uid },
            { $addToSet: { fcmTokens: token } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'FCM token saved successfully.' });

    } catch (error) {
        console.error('Error adding FCM token:', error);
        res.status(500).json({ message: 'Error saving FCM token.' });
    }
};
