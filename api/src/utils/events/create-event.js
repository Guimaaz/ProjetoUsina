function createEvent(eventDb, { name, content, imageUrl, eventDate }) {
  eventDb.run("INSERT INTO events (name, content, image, eventDate) VALUES (?, ?, ?, ?)", [name, content, imageUrl, eventDate], (err) => {
    if (err) {
      return res.status(500).send({ message: "Error creating event" })
    }
    
    return res.status(201).send({ message: 'Event created successfully' })
  })
}

module.exports = createEvent