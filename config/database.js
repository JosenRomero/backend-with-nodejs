const mongoose = require("mongoose");

mongoose
    .connect(process.env.URI_DB, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

module.exports = mongoose;