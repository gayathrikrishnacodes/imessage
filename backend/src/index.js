import express from "express";
import { connectDB } from "./lib/db.js";

import "dotenv/config";
import cors from "cors";
import dns from "node:dns";
import User from './models/user.model.js';

import job from "./lib/cron.js";
import { clerkMiddleware } from "@clerk/express";
// dns.setServers(["1.1.1.1", "8.8.8.8"]);
 
import fs from 'fs';
import path from 'path';


const app = express();
const PORT =process.env.PORT;
const FRONTEND_URL =process.env.FRONTEND_URL;
const publicDir=path.join(process.cwd(),"public");

// Middleware
app.use(express.json())
app.use(cors({origin:FRONTEND_URL,credentials:true}));
app.use(clerkMiddleware());

// GET route
app.get("/health", (req, res) => {
    // const {message,image,video}=req.body;
    res.status(200).json({ok:true});
});


//if the public directory exists, serve the static files
//this is for the production build

if(fs.existsSync(publicDir)){
app.use(express.static(publicDir));
app.get("/{*any}", (req,res,next)=>{
    res.sendFile(path.join(publicDir,"index.html"), (err)=>next(err));
})
}
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log("Server is running on PORT", PORT);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

startServer();



