// import mongoose from "mongoose";

// const FriendRequestSchema = new mongoose.Schema(
//   {
//     from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     status: {
//       type: String,
//       enum: ["pending", "accepted", "rejected"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
// export default FriendRequest;



import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// This index ensures that the combination of 'from' and 'to' is unique,
// preventing duplicate friend requests.
FriendRequestSchema.index({ from: 1, to: 1 }, { unique: true });


const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;
