const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        userId: { 
            type: String, 
            required: true 
        },
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        publicTask: { 
            type: Boolean,
            required: true 
        },
        likers: {
            type: [String],
            required: true,
        },
    }, {
        timestamps: true,
});

module.exports = mongoose.model("Task", TaskSchema);