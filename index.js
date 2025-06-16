import express from "express";
import { PrismaClient } from "@prisma/client";
import  {configDotenv } from "dotenv";
configDotenv();

const port = process.env.SERVER_PORT_NUMBER;
const app = express();
const role = new PrismaClient();




app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

