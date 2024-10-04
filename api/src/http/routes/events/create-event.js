const { eventDb } = require("../../../db")
const { matchImageUrl, matchDate } = require('../../../utils/regex')

const validateIfEventExists = require("../../../utils/events/validate-if-event-exists")
const createEvent = require('../../../utils/events/create-event')

async function createEventRoute(app) {
  app.post('/events/create', async (req, res) => {
    try {
      const { name, content, eventDate, imageUrl } = req.body
      
      if (!name || !content || !eventDate || !imageUrl) {
        return res.status(400).send({ message: "Invalid data" })
      }

      matchImageUrl()
      matchDate()

      const eventExists = validateIfEventExists(eventDb, { name, content, imageUrl, eventDate })

      if(eventExists) {
        return res.status(400).send({ message: `Event named "${name}" already exists` })
      }

      createEvent(eventDb, { name, content, imageUrl, eventDate })
    } catch(err) { 
      throw new Error('Error at creating event', err)
    }
  })
}

module.exports = createEventRoute