const EventReservationVolunteer = require('../model/eventreservationvolunteer')

const CreateEventReservation = async (req, res) => {
    const data = req.body
    const userId = req.userData.userId
    const eventReservation = await EventReservationVolunteer.findOne({ volunteerID: userId, eventID: data.eventID, eventGroupID: data.eventGroupID })
    if (eventReservation) {
        return res.status(403).json({ message: 'Event already reserved for user' })
    }
    try {
        const eventReservationVolunteer = await EventReservationVolunteer.create({
            volunteerID: userId,
            eventID: data.eventID,
            eventGroupID: data.eventGroupID,
        })
        res.status(201).json({
            message: 'EventReservationVolunteer added successfully',
            id: eventReservationVolunteer._id
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
        const eventReservationVolunteer = await EventReservationVolunteer.find({ volunteerID: userId })
        res.status(200).json(eventReservationVolunteer)
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
        const eventReservationVolunteer = await EventReservationVolunteer.findOne({ _id: req.params.id, volunteerID: userId })
        if (!eventReservationVolunteer) {
            return res.status(404).json({ msg: `No event reservation with id ${req.params.id}` })
        }
        res.status(200).json(eventReservationVolunteer)
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
        const eventReservationVolunteer = await EventReservationVolunteer.findOneAndUpdate({ _id: req.params.id, volunteerID: userId }, newObj)
        if (!eventReservationVolunteer) {
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
        const eventReservationVolunteer = await EventReservationVolunteer.findOneAndDelete({ _id: req.params.id, volunteerID: userId })
        if (!eventReservationVolunteer) {
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