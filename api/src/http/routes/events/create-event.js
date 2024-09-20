const { eventDb } = require("../../../db")

async function createEvent(app) {
  app.post('/events/create', async (req, res) => {
    try {
      const { name, content, eventDate, imageUrl } = req.body
      
      if (!name || !content || !eventDate || !imageUrl) {
        return res.status(400).send({ message: "Invalid data" })
      }
      
      const imageRegex = new RegExp('/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g')
      
      if (!imageUrl.match(imageRegex)) {
        return res.status(400).send({ message: "Invalid image url" })
      }
      
      const dateRegex = new RegExp('\d{1,2}\/\d{1,2}\/\d{2,4}')
      
      if (!eventDate.match(dateRegex)) {
        return res.status(400).send({ message: "Invalid date format" })
      }
      
      eventDb.get("SELECT * FROM events WHERE name = ?", [name], (err, event) => {
        if(err) {
          return res.status(500).send({ message: "Internal server error" })
        }
        
        if (event) {
          return res.status(400).send({ message: `Event name "${name}" already exists` })
        }
        
        eventDb.run("INSERT INTO events (name, content, image, eventDate) VALUES (?, ?, ?, ?)", [name, content, imageUrl, eventDate], (err) => {
          if (err) {
            return res.status(500).send({ message: "Error creating event" })
          }
          
          return res.status(201).send({ message: 'Event created successfully' })
        })
      })
    } catch(err) { 
      throw new Error('Error at creating event', err)
    }
  })
}

module.exports = createEvent