import mongoose from 'mongoose';

/**
 * @description Middleware function to delete all data associated with a user.
 * This is called before the user document itself is deleted.
 * @param {string} userId - The Mongoose _id of the user to be deleted.
 */
export const cascadeDeleteUser = async (userId) => {
  console.log(`Initiating cascade delete for user: ${userId}`);
  
  try {
    // A transaction ensures that all these operations succeed or none of them do.
    // This prevents the database from being left in an inconsistent state.
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      // 1. Delete all friendships involving this user
      await mongoose.model('Friendship').deleteMany({ users: userId }, { session });

      // 2. Delete all friend requests sent from or to this user
      await mongoose.model('FriendRequest').deleteMany({ $or: [{ from: userId }, { to: userId }] }, { session });

      // 3. Delete all block records involving this user
      await mongoose.model('BlockedUser').deleteMany({ $or: [{ blocker: userId }, { blocked: userId }] }, { session });

      // 4. Delete all messages sent by this user
      await mongoose.model('Message').deleteMany({ sender: userId }, { session });
    });
    session.endSession();
    console.log(`Successfully cleaned up data for user: ${userId}`);
  } catch (error) {
    console.error(`Error during cascade delete for user ${userId}:`, error);
    // Re-throw the error so the calling function knows something went wrong
    throw error;
  }
};
