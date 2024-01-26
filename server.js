const express = require("express");
const cors = require("cors");
require('dotenv').config({path: './config/.env'});
require("./config/database");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

const app = express();

require('./auth/passport')(passport);

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

const sessionConfig = {
    secret: process.env.SECRETCODE,
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
    store: MongoStore.create({ 
        mongoUrl: process.env.URI_DB
    })
}

if(process.env.NODE_ENV == 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionConfig.cookie.secure = true;// serve secure cookies
}

app.use(session(sessionConfig));

// initalize passport
app.use(passport.initialize()); 

// deserialize cookie from the browser
app.use(passport.session()); 

// set up cors to allow us to accept requests from our client
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true // allow session cookie from browser to pass through
}));

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/api/task", require("./routes/task.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.use(notFound);

app.use(handleErrors);

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`)
});