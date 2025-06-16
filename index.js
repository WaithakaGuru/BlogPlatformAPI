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
        if(users && users.length > 0){
            res.status(200).json(users);
            res.send("Getting all users :)");
        }
        else res.status(400).json({message: "Empty: No Records Found!!"})
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
        if(user) {
            res.status(200).json(user);
            res.send(`Getting user with id: '${id}`)
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"})
    }
}

// Create new user 
async function makeNewUser(req, res) {
    try{
        const { firstName, lastName, emailAddress, username} = req.body;
        if(!firstName || !lastName || !emailAddress || !username) res.send("All User Fields are required!");
        else {
            const createUser = await role.users.create({
                data: {
                    firstName, lastName, emailAddress, username
                }
            })
            res.send("Creating a new user ")
        }
    }catch(err){
        console.log(err);
    }
}

// Get posts alongside their author details 
async function getAllPosts(req, res) {
    try {
        const posts = await role.posts.findMany({
            include:{
                author: true
            }
        });
        if(posts && posts.length > 0) {
            res.status(200).json(posts);
            res.send("Getting all posts");
        }else res.status(400).json("Empty: No Records found!!")
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"})
    }
}

// Get a specific post via it's unique post id 
async function getSinglePost(req, res){
    const id = req.params.id 
    try {
        const post = await role.posts.findFirst({
            where: {id},
            include: {
                author: true
            }
        })
        if(post) {
            res.status(200).json(post);
            res.send(`Getting post with id: ${id}`);
        }else res.status(400).json({message: "Post not found :)"});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"});
    }
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

