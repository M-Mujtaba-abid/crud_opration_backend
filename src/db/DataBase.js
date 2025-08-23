import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    console.log("DB URI =>", process.env.MONGO_DB); // check value aayi ke nahi
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
  }
};
