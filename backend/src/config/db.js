// // import mongoose from "mongoose";
// // import dotenv from "dotenv";

// // const connectDb = async () => {
// //   try {
// //     // console.log(process.env.MONGO_URI);
// //     const conn = await mongoose.connect(process.env.MONGO_URI);
// //     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
// //   } catch (error) {
// //     console.error(`❌ Error: ${error.message}`);
// //     process.exit(1);
// //   }
// // };

// // export default connectDb;


// import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ Error connecting to MongoDB: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDb;



import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;