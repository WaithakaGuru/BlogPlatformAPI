import express, { json } from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import  {configDotenv } from "dotenv";
configDotenv();

const port = process.env.SERVER_PORT_NUMBER;
const app = express();
app.use(json());
const role = new PrismaClient();

// Getting all users 
async function getAllUsers(_req, res) {
    try{
        const users = await role.users.findMany();
        if(users && users.length > 0)res.status(200).json(users);
        else res.status(400).json({message: "Empty Records!!"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error!!"})
    }
}

// Get a specific user 
async function getSingleUser(req, res){
    const id = req.params.id;
    try{
        const user = await role.users.findFirst({
            where: {id}
        })
        if(user) res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"})
    }
}

// Create new user 
async function makeNewUser(req, res) {

}

// Get posts alongside their author details 
async function getAllPosts(req, res) {

}

// Get a specific post via it's unique post id 
async function getSinglePost(req, res){

}

// Create a new post 
async function makeNewPost(req, res){

}

// Update a specific post via it's  post id 
async function updatePost(req, res){

}
 
// delete a specific post via it's id 
async function deletePost(req, res) {

}

app.get("/users", getAllUsers);
app.get("/user/:id", getSingleUser);
app.get("/posts", getAllPosts);
app.get("/posts/:id", getSinglePost);

app.post("/users", makeNewUser);
app.post("/posts", makeNewPost);

app.put("/posts/:id", updatePost);

app.delete("/posts/id", deletePost);

app.get("/", (_req, res)=> {
    res.send("Welcome to the Home Page")
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

