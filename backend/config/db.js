import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/auth_demo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;