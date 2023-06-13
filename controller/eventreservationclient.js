const EventReservationClient = require('../model/eventreservationclient')

const CreateEventReservation = async (req, res) => {
    const data = req.body
    const userId = req.userData.userId
    const eventReservation = await EventReservationClient.findOne({ clientID: userId, eventID: data.eventID, eventGroupID: data.eventGroupID })
    if (eventReservation) {
        return res.status(403).json({ message: 'Event already reserved for user' })
    }
    try {
        const eventReservationClient = await EventReservationClient.create({
            clientID: userId,
            eventID: data.eventID,
            eventGroupID: data.eventGroupID,
        })
        res.status(201).json({
            message: 'EventReservationClient added successfully',
            id: eventReservationClient._id
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}



const GetEventReservations = async (req, res) => {
    const userId = req.userData.userId

    try {
        const eventReservationClient = await EventReservationClient.find({ clientID: userId })
        res.status(200).json(eventReservationClient)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}





const GetSingleEventReservation = async (req, res) => {
    const userId = req.userData.userId

    try {
        const eventReservationClient = await EventReservationClient.findOne({ _id: req.params.id, clientID: userId })
        if (!eventReservationClient) {
            return res.status(404).json({ msg: `No event reservation with id ${req.params.id}` })
        }
        res.status(200).json(eventReservationClient)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




const UpdateEventReservation = async (req, res) => {
    const userId = req.userData.userId

    const newObj = {}
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i]
    }
    try {
        const eventReservationClient = await EventReservationClient.findOneAndUpdate({ _id: req.params.id, clientID: userId }, newObj)
        if (!eventReservationClient) {
            return res.status(404).json({ msg: `No event reservation with id ${req.params.id}` })
        }
        res.status(200).json({ message: 'Event Reservation updated successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


const DeleteEventReservation = async (req, res) => {
    const userId = req.userData.userId

    try {
        const eventReservationClient = await EventReservationClient.findOneAndDelete({ _id: req.params.id, clientID: userId })
        if (!eventReservationClient) {
            return res.status(404).json({ msg: `No event reservation with id ${req.params.id}` })
        }
        res.status(200).json({ message: "Event reservation deleted successfully" })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




module.exports = {
    CreateEventReservation,
    GetEventReservations,
    GetSingleEventReservation,
    UpdateEventReservation,
    DeleteEventReservation
}