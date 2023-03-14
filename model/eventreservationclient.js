const mongoose = require('mongoose')

// ID
// ClientID
// EventGroupsID
// EventID
// CheckIN
// CheckOut


const EventReservationClient = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    eventGroupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventGroup',
        required: [true, "EventGroupID is required"]
    },
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, "EventID is required"]
    },
    checkIN: {
        type: Boolean,
        default: false
    },
    checkOut: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('EventReservationClient',EventReservationClient)