// import { connect } from "mongoose";

// const connectDB = async () => {
//   try {
//     await connect("mongodb://localhost:27017/auth_demo", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variab les

const connectDB = async () => {
  try {
    const mongoURI = process.env.REACT_APP_MONGO_URI;
    // console.log(mongoURI);

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(mongoURI, {
      dbName: "auth_demo",
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;

