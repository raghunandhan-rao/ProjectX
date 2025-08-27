// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import admin from "firebase-admin";

// import connectDb from "./src/config/db.js";
// import userRoutes from "./src/routes/user.routes.js"; // Make sure this path is correct

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const serviceAccount = require('./src/config/serviceAccountKey.json');

// dotenv.config();

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// // Initialize Express App
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDb();

// // --- Main Routes ---
// app.get("/", (req, res) => {
//   res.send("Server is running 🚀");
// });

// // --- THIS IS THE CRITICAL LINE ---
// // It tells your app to use your user routes for any path that starts with "/api/users"
// app.use("/api/users", userRoutes);


// // --- Start Server ---
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";

import connectDb from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import friendRoutes from "./src/routes/friend.routes.js"; // 1. Import friend routes

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./src/config/serviceAccountKey.json');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Use the API routes
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes); // 2. Add the new friend routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
