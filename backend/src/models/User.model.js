// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   // The user's unique ID from Firebase is used as the primary key (_id)
//   _id: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   name: {
//     type: String,
//     trim: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   // You can add more fields like followers, etc., here later
// });

// const User = mongoose.model("User", UserSchema);
// export default User;
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;