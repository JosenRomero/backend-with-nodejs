const mongoose = require("mongoose");

const URI = "mongodb://localhost/dailyDB";

mongoose
    .connect(
        URI, 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false, 
        }
    )
    .then(db => console.log("DB is connected"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

module.exports = mongoose;