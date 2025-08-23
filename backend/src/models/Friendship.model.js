import mongoose from "mongoose";

const FriendshipSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    since: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FriendshipSchema.index({ user1: 1, user2: 1 }, { unique: true });

const Friendship = mongoose.model("Friendship", FriendshipSchema);
export default Friendship;
