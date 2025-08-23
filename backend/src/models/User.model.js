
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   email: { type: String, required: true, unique: true, trim: true },
//   name: { type: String, trim: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", UserSchema);
// export default User;



import mongoose from "mongoose";
import { nanoid } from "nanoid";

const ALLOWED_INTERESTS = [
  "dance", "sing", "sports", "music", "art",
  "technology", "reading", "travel", "gaming", "cooking"
];

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_.]+$/,
      minlength: 3,
      maxlength: 20,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(8),
    },
    email: { type: String, required: true, unique: true, trim: true },

    // Verification
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    kycVerified: { type: Boolean, default: false },

    // Profile
    kycPhotoURL: { type: String, default: null },
    gender: {
      type: String,
      enum: ["male", "female", "other", null],
      default: null,
    },

    // Interests
    selectedInterests: {
      type: [String],
      enum: ALLOWED_INTERESTS,
      required: true,
      validate: [
        {
          validator: (v) => Array.isArray(v),
          message: "Interests must be an array",
        },
        {
          validator: (v) => v.length >= 3,
          message: "Select at least three interests",
        },
      ],
    },

    // FCM tokens
    fcmTokens: [{ type: String }],
  },
  { timestamps: true }
);

UserSchema.virtual("starRating").get(function () {
  let count = 1;
  if (this.emailVerified) count++;
  if (this.phoneVerified) count++;
  if (this.kycVerified) count++;
  if (Array.isArray(this.selectedInterests) && this.selectedInterests.length >= 3)
    count++;
  return count;
});

UserSchema.index({ username: 1 });
UserSchema.index({ slug: 1 });
UserSchema.index({ selectedInterests: 1 });

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", UserSchema);
export default User;
