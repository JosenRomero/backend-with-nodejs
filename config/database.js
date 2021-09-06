const mongoose = require("mongoose");

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, 
}

mongoose
    .connect(process.env.URI_DB, options)
    .then(db => console.log("DB is connected"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

module.exports = mongoose;