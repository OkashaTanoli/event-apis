const mongoose = require('mongoose')

// ID
// EventID
// GroupLetter
// GroupCapacity
// GroupReservations
// Groupstatus
// GroupHour

const EventGroup = new mongoose.Schema({
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    groupLetter: {
        type: String,
        required: [true, "GroupLetter is required"],
        maxLength: 1
    },
    groupCapacity: {
        type: Number,
        required: [true, "GroupCapacity is required"]
    },
    groupReservations: {
        type: Boolean,
        default: true
    },
    groupStatus: {
        type: Boolean,
        default: false
    },
    groupHour: {
        type: Number,
        required: [true, "GroupHour is required"],
        min: 1,
        max: 24
    }
})


module.exports = mongoose.model("EventGroup", EventGroup);