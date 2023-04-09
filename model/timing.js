const mongoose = require('mongoose')

// Prioreventstarttime
// Prioreventendtime
// EventstartTime
// EventEndTime
// AfterEventStartTime
// AfterEventEndTime

const Timing = new mongoose.Schema({

    //     Timings 

    eventId: {
        type: String,
        required: [true, "Event ID is required"]
    },
    priorEventStartTime: {
        type: Date,
        required: [true, "PriorEventStartTime is required"]
    },
    priorEventEndTime: {
        type: Date,
        required: [true, "PriorEventEndTime is required"]
    },
    eventStartTime: {
        type: Date,
        required: [true, "EventStartTime is required"]
    },
    eventEndTime: {
        type: Date,
        required: [true, "EventEndTime is required"]
    },
    afterEventStartTime: {
        type: Date,
        required: [true, "AfterEventStartTime is required"]
    },
    afterEventEndTime: {
        type: Date,
        required: [true, "AfterEventEndTime is required"]
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required"]
    },

})

module.exports = mongoose.model("Timing", Timing);