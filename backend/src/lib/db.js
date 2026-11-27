import mongoose from "mongoose";

export async function connectDB(){
    try{
        const mongoUri= process.env.MONGO_URI;
        if(!mongoUri){
            throw new Error("MONGO_URI is required")
        }
        const con= await mongoose.connect(mongoUri);


        console.log("Mongo URI exists:", !!process.env.MONGO_URI);
console.log(
  "Mongo host:",
  process.env.MONGO_URI?.split("@")[1]?.split("/")[0]
);


        console.log("MongoDB connected",con.connection.host);
    }catch(error){
        console.error("MongoDB connected error",error.message);
        // process.exit(1);
                throw error;

        //1 means failed, 0 means success
    }
}

