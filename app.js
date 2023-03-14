const express = require("express")
require('dotenv').config()
const cors = require('cors')
const ConnectMongoDB = require("./db/db")
const client = require('./routes/client')
const volunteer = require('./routes/volunteer')
const event = require('./routes/event')
const eventGroup = require('./routes/eventgroup')
const eventReservationClient = require('./routes/eventreservationclient')
const eventReservationVolunteer = require('./routes/eventreservationvolunteer')
const admin = require('./routes/admin')
const businessAdmin = require('./routes/businessadmin')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


app.use("/api/v1/client", client)
app.use("/api/v1/volunteer", volunteer)
app.use("/api/v1/event", event)
app.use("/api/v1/eventgroup", eventGroup)
app.use("/api/v1/eventreservationclient", eventReservationClient)
app.use("/api/v1/eventreservationvolunteer", eventReservationVolunteer)
app.use("/api/v1/admin", admin)
app.use("/api/v1/businessadmin", businessAdmin)



app.get('/', (req, res) => {
    res.send('hi')
})

ConnectMongoDB(process.env.MONGO_URI).then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })

}).catch((err) => {
    console.log("error => ", err)
})