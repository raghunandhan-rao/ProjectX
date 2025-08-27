import mongoose from "mongoose";

const FriendshipSchema = new mongoose.Schema(
  {
    // Store both users in an array. This makes queries easier.
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }],
    since: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'since', updatedAt: false } }
);

// This pre-save hook runs before any document is saved.
// It sorts the user IDs in the 'users' array.
FriendshipSchema.pre('save', function(next) {
    if (this.users && this.users.length === 2) {
        this.users.sort();
    }
    next();
});

// This unique index on the 'users' array now correctly prevents
// duplicate friendships, regardless of the order the users were added in.
FriendshipSchema.index({ users: 1 }, { unique: true });

const Friendship = mongoose.model("Friendship", FriendshipSchema);
export default Friendship;
