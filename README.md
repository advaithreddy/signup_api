# Signup API

A simple API for user sign-up and sign-in.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Introduction

This API provides endpoints for user sign-up and sign-in. It uses Express.js for the server, Mongoose for database interactions, and bcrypt for password hashing.

## Features

- User sign-up with validation
- User sign-in with password comparison
- MongoDB for data storage
- Secure password hashing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running
- Git installed (for cloning the repository)

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:

git clone https://github.com/YOUR_USERNAME/signup_api.git

2. Change into project directory

cd signup_api

3. install dependencies

npm install

4. Create a .env file in the root directory with your MongoDB connection URI. For example:

MONGODB_URI=mongodb://localhost/your-database-name

5. start the server

npm start


# The Server should no be running on PORT : 3000

# Usage
You can test the API using tools like Insomnia or Postman. Here are the available endpoints:

POST /api/auth/signup: Create a new user.

Example Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "secretpassword"
}

POST /api/auth/signin: Sign in with an existing user.
Example Request Body:
{
  "email": "johndoe@example.com",
  "password": "secretpassword"
}

Note - Make sure to replace example data with your actual data.
