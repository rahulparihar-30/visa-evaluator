import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, { dbName: 'visa_records' });
    console.log("MONGO connection successfull.");
  } catch (error) {
    console.error("Error connecting to mongoDB\n So, data will be stored locally.",);
  }
};


export default connectToMongo;