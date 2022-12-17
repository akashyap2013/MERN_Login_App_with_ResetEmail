import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(getUri);
    console.log("Database Connected")
    return db;
}

export default connect;