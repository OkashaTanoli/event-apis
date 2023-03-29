const mongoose = require('mongoose')

// ID
// EventID
// Organization
// EventType
// Location
// Prioreventstarttime
// Prioreventendtime
// EventstartTime
// EventEndTime
// AfterEventStartTime
// AfterEventEndTime
// EventCapacity
// GroupServicePeriod
// VolunteerCapacity
// Eventcode

const Event = new mongoose.Schema({
    organization: {
        type: String,
        required: [true, "Organization is required"]
    },
    eventType: {
        type: String,
        required: [true, "EventType is required"]
    },
    location: {
        latitude: { type: Number, retuired: [true, "Latitude for location is required"] },
        longitude: { type: Number, retuired: [true, "Longitude for location is required"] },
        latitudeDelta: { type: Number, retuired: [true, "LatitudeDelta for location is required"] },
        longitudeDelta: { type: Number, retuired: [true, "LongitudeDelta for location is required"] },
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
    eventCapacity: {
        type: Number,
        required: [true, "EventCapacity is required"]
    },
    place: {
        type: String,
        required: [true, "Place is required"]
    },
    house: {
        type: String,
        required: [true, "House is required"]
    },
    zip: {
        type: String,
        required: [true, "Zip is required"]
    },
    day: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    monthYear: {
        type: String,
        default: null
    },
    groupServicePeriod: {
        type: String,
        required: [true, "GroupServicePeriod is required"]
    },
    volunteerCapacity: {
        type: Number,
        required: [true, "VolunteerCapacity is required"]
    },
    eventCode: {
        type: String,
        required: [true, "Eventcode is required"],
        minLength: 4,
        maxLength: 4
    },
})

module.exports = mongoose.model("Event", Event);