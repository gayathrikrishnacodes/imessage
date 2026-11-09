// import express from 'express';
// import { connectDB } from "./lib/db.js";
// import "dotenv/config"
// import dns from "node:dns";

// dns.setServers(["1.1.1.1", "8.8.8.8"]);
// const app=express();
// const PORT=process.env.PORT
// console.log("MONGO_URI=",process.env.MONGO_URI)

// app.listen(PORT,()=> {
//     connectDB();
//     console.log("server is up and running on port 3000",PORT )}
//  );




import express from "express";
import { connectDB } from "./lib/db.js";
import "dotenv/config";
import {cors} from express
import dns from "node:dns";
import User from './models/user.model.js';
import { clerkMiddleware } from "@clerk/express";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT =process.env.PORT;
const FRONTEND_URL =process.env.FRONTEND_URL;


// Middleware
app.use(express.json())
app.use(cors({origin:FRONTEND_URL,credentials:true}));
app.use(clerkMiddleware());

// GET route
app.get("/health", (req, res) => {
    // const {message,image,video}=req.body;
    res.send("Chat application backend is running!");
});

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();
