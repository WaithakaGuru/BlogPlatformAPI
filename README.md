# Minimal Blogging Platform RESTFul API

## Description

This project is a simple RESTful API for a minimal blogging platform. It allows users to register and create blog posts. The API is built using Express for server and routing, Prisma ORM for database interaction, and PostgreSQL as the database. The API is designed to be deployed on a cloud service such as Render or Railway.

## Technologies Used
- Express.js -  for Backend Server and routing 
- Prisma ORM - For interaction with the database 
- PostgreSQL - For the Database 
- Node.js - For Package and dependancies mmanagement 

## Requirements
- Node.js and npm installed
- PostgreSQL database

<!-- ## Models

### User
- `id` (string, primary key, uuid)
- `firstName` (string)
- `lastName` (string)
- `emailAddress` (string, unique)
- `username` (string, unique)

### Post
- `id` (string, primary key, uuid)
- `title` (string)
- `content` (string)
- `createdAt` (DateTime, default now)
- `lastUpdated` (DateTime, uses @updatedAt)
- `isDeleted` (Boolean, default false)
- `authorId` (string, foreign key to User)

A one-to-many relationship exists between User and Post: one user can have multiple posts, but each post belongs to one user.

--- -->

## Endpoints

### User Endpoints

#### GET /users
- Returns a list of all users.

#### GET /users/:id
- Returns a single user by ID along with their blog posts.

#### POST /users
- Creates a new user.
- Request Body Example:
  ```json
  {
    "firstName": "Jonteh",
    "lastName": "Kamaa",
    "emailAddress": "jonteh@example.com",
    "username": "jonteh123"
  }
  ```

---

### Post Endpoints

#### GET /posts
- Returns a list of all posts (includes author details for each post).

#### GET /posts/:id
- Returns a single post by ID (includes author details).

#### POST /posts
- Creates a new blog post.
- Request Body Example:
  ```json
  {
    "title": "My Post",
    "content": "Some content",
    "authorId": "user-uuid"
  }
  ```

#### PUT /posts/:id
- Updates a post by ID.
- Request Body Example:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```

#### DELETE /posts/:id
- Deletes a post by ID (soft delete, sets isDeleted to true).

---

## Deployment

You can deploy this API to Render, Railway, or any cloud service that supports Node.js and PostgreSQL.

---
