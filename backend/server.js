// // // // // src/server.js
// // // // import express from "express";
// // // // import dotenv from "dotenv";
// // // // import connectDb from "./src/config/db.js";

// // // // dotenv.config(); // load env first

// // // // const app = express();
// // // // app.use(express.json());

// // // // // Connect to DB
// // // // connectDb();

// // // // // Routes
// // // // app.get("/", (req, res) => {
// // // //   res.send("Server is running 🚀");
// // // // });

// // // // // Start server
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));



// // // import express from "express";
// // // import dotenv from "dotenv";
// // // import cors from "cors";
// // // import admin from "firebase-admin";
// // // import connectDb from "./src/config/db.js";
// // // import userRoutes from "./src/routes/user.routes.js";
// // // import { createRequire } from 'module';

// // // // --- Setup ---
// // // dotenv.config();
// // // const require = createRequire(import.meta.url);
// // // const serviceAccount = require('./src/config/serviceAccountKey.json');

// // // // --- Initialize Firebase Admin ---
// // // admin.initializeApp({
// // //   credential: admin.credential.cert(serviceAccount)
// // // });

// // // // --- Initialize Express App ---
// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // --- Connect to MongoDB ---
// // // connectDb();

// // // // --- API Routes ---
// // // app.get("/", (req, res) => {
// // //   res.send("Backend server is running 🚀");
// // // });

// // // // Use the user routes for any request starting with /api/users
// // // app.use("/api/users", userRoutes);

// // // // --- Start Server ---
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));



// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import admin from "firebase-admin";
// // import connectDb from "./src/config/db.js";
// // import userRoutes from "./src/routes/user.routes.js";
// // import { createRequire } from 'module';

// // dotenv.config();
// // const require = createRequire(import.meta.url);
// // const serviceAccount = require('./src/config/serviceAccountKey.json');

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount)
// // });

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // connectDb();

// // app.get("/", (req, res) => res.send("Backend server is running 🚀"));
// // app.use("/api/users", userRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors"; // 1. Make sure cors is imported
// import admin from "firebase-admin";

// import connectDb from "./src/config/db.js";
// import userRoutes from "./src/routes/user.routes.js";

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const serviceAccount = require('./src/config/serviceAccountKey.json');

// dotenv.config();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const app = express();

// // 2. Enable CORS for all routes - THIS IS THE FIX
// // This line must come before your routes are defined.
// app.use(cors()); 

// app.use(express.json());

// connectDb();

// // --- API Routes ---
// app.get("/", (req, res) => res.send("Backend server is running 🚀"));
// app.use("/api/users", userRoutes);

// // --- Start Server ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";

import connectDb from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js"; // Make sure this path is correct

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./src/config/serviceAccountKey.json');

dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDb();

// --- Main Routes ---
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// --- THIS IS THE CRITICAL LINE ---
// It tells your app to use your user routes for any path that starts with "/api/users"
app.use("/api/users", userRoutes);


// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));