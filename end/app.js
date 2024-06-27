const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')

app.use(express.urlencoded({ extended: true }))

app.get('/games', Controller.readGames)
app.get('/managers', Controller.readManagers)
app.get('/events', Controller.readEvents)
app.post('/events', Controller.addEvents)
app.get('/events/:id', Controller.readDetailEvent)
app.delete('/events/:id', Controller.deleteEvent)
app.put('/events/:id', Controller.editEvent)
app.patch('/events/:id', Controller.updateStatus)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})