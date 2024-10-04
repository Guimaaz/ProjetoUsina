const { eventDb } = require("../../../db")
const deleteEvent = require("../../../utils/events/delete-event")

async function deleteEventById(app) {
  app.delete('/events/:id', async (req, res) => {
    try {
      const { id } = req.params

      deleteEvent(eventDb, id)

      return res.status(200).send({ message: 'Event deleted successfully' })
    } catch(err) { 
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = deleteEventById