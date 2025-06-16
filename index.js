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
        else res.status(404).json({message: "Empty: No Records Found!!"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error!!"})
    }
}

// Get a specific user 
async function getSingleUser(req, res){
    const id = req.params.id;
    try{
        const user = await role.users.findUnique({
            where: {id:id}
        })
        if(user) {
            res.status(200).json(user);
            res.send(`Getting user with id: ${id}`)
        }
        else res.status(404).json({message: "Empty: No Records Found!!"})
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
             where:{isDeleted: false},
            include:{author: true}
        });
        if(posts && posts.length > 0) {
            res.status(200).json(posts);
            res.send("Getting all posts");
        }else res.status(404).json("Empty: No Records found!!")
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"})
    }
}

// Get a specific post via it's unique post id 
async function getSinglePost(req, res){
    const id = req.params.id 
    try {
        const post = await role.posts.findUnique({
            where: {id, isDeleted: false},
            include: {
                author: true
            }
        })
        if(post) {
            res.status(200).json(post);
            res.send(`Getting post with id: ${id}`);
        }else res.status(404).json({message: "Post not found :)"});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"});
    }
}

// Create a new post 
async function makeNewPost(req, res){
    try{
        const { title, content, authorId} = req.body;
        if(!title || !content || !authorId) res.send("All post Fields are required!");
        else {
            const createPost = await role.posts.create({
                data: { title, content, authorId }
            })
            res.send("Creating a new post")
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error!!"});
    }
}

// Update a specific post via it's  post id 
async function updatePost(req, res){
    const id = req.params.id;
    try {
        const {id, title, content, authorId} = req.body
        const updatedPost = await role.posts.update({
            data:{
                id, title, content, authorId
            },
            where:{id}
        })
        if(updatedPost) res.status(201).json(updatedPost);
        else res.json({message: "Failed to update post. Try again later!!"});
    } catch (err) {
       console.log(err); 
       res.status(500).json({message: "Internal Server Error!!"});
    }
}
 
// delete a specific post via it's id 
async function deletePost(req, res) {
    const id = req.params.id;
    try{
        // const{isDeleted} = req.body;
        const postToDelete = await role.posts.update({
            data:{isDeleted: true},
            where:{id}
        })
        if(postToDelete) res.status(200).json(postToDelete);
        else res.status(400).json({message: "Bad request: Failed to delete post"})
    }catch (err) {
       console.log(err); 
       res.status(500).json({message: "Internal Server Error!!"});
    }
}

app.get("/users", getAllUsers);
app.get("/users/:id", getSingleUser);
app.get("/posts", getAllPosts);
app.get("/posts/:id", getSinglePost);

app.post("/users", makeNewUser);
app.post("/posts", makeNewPost);

app.put("/posts/:id", updatePost);

app.patch("/posts/:id", deletePost);

app.get("/", (_req, res)=> {
    res.send("Welcome to the Home Page")
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

