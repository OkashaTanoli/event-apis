const Event = require('../model/events')

const CreateEvent = async (req, res) => {
    const data = req.body
    try {
        const event = await Event.create({
            organization: data.organization,
            eventType: data.eventType,
            location: {
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                latitudeDelta: data.location.latitudeDelta,
                longitudeDelta: data.location.longitudeDelta
            },
            priorEventStartTime: data.priorEventStartTime,
            priorEventEndTime: data.priorEventEndTime,
            eventStartTime: data.eventStartTime,
            eventEndTime: data.eventEndTime,
            afterEventStartTime: data.afterEventStartTime,
            afterEventEndTime: data.afterEventEndTime,
            eventCapacity: data.eventCapacity,
            groupServicePeriod: data.groupServicePeriod,
            volunteerCapacity: data.volunteerCapacity,
            eventCode: data.eventCode
        })
        res.status(201).json({
            message: 'Event added successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}



const GetEvents = async (req, res) => {
    try {
        const events = await Event.find()
        res.status(200).json(events)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}





const GetSingleEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id })
        if (!event) {
            return res.status(404).json({ msg: `No event with id ${req.params.id}` })
        }
        res.status(200).json(event)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




const UpdateEvent = async (req, res) => {
    const newObj = {}
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i]
    }
    try {
        const event = await Event.findOneAndUpdate({ _id: req.params.id }, newObj)
        if (!event) {
            return res.status(404).json({ msg: `No event with id ${req.params.id}` })
        }
        res.status(200).json({ message: 'Event updated successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


const DeleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id })
        if (!event) {
            return res.status(404).json({ msg: `No event with id ${req.params.id}` })
        }
        res.status(200).json({ message: "Event deleted successfully" })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




module.exports = {
    CreateEvent,
    GetEvents,
    GetSingleEvent,
    UpdateEvent,
    DeleteEvent
}