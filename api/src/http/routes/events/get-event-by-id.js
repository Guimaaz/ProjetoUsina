const { eventDb } = require("../../../db")

const getEvents = require("../../../utils/events/get-events")

async function getEventByIdRoute(app) {
  app.get('/events/:id', async (req, res) => {
    try {
      const { id } = req.params

      const event = getEvents(eventDb, 'one', id)

      return res.status(200).send({ event })
    } catch(err) { 
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = getEventByIdRoute