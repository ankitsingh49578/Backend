const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        maxLength: 500,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

// collection ~ table
const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;