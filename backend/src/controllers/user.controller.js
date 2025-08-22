// import User from "../models/User.model.js";

// // Handles the logic to sync a Firebase user to the MongoDB database
// export const syncUser = async (req, res) => {
//   try {
//     const { uid, email, name } = req.user; // Data from the verified token

//     // Creates a new user document if it doesn't exist,
//     // or updates the existing one.
//     const user = await User.findByIdAndUpdate(
//       uid,
//       { email, name },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );
    
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error syncing user:', error);
//     res.status(500).json({ message: 'Error syncing user' });
//   }
// };



import User from "../models/User.model.js";

export const syncUser = async (req, res) => {
  try {
    const { uid, email, name } = req.user;
    const user = await User.findByIdAndUpdate(
      uid,
      { email, name },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ message: 'Error syncing user' });
  }
};