const express = require("express");
const cors = require("cors");
require('dotenv').config({path: './config/.env'});
require("./config/database");

const app = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

// set up cors to allow us to accept requests from our client
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true // allow session cookie from browser to pass through
}));

// Routes

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`)
});