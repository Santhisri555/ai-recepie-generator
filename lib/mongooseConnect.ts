import mongoose from "mongoose";

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://aifoodieco:AIchef2023@cluster0.vmwz5bp.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached = global.mongoose;

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongooseConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   bufferMaxEntries: 0,
      //   useFindAndModify: true,
      //   useCreateIndex: true,
    };
    //@ts-ignore
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default mongooseConnect;
