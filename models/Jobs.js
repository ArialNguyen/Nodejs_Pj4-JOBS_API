const mongoose = require("mongoose")

const jobs = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company must be required"]
    },
    position:{
        type: String,
        required: [true, "Position must be required"]
    },
    status:{
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: [true, "Please provide User"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Jobs", jobs)