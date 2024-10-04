function getEvents(eventDb, whichEvent = 'all', eventId) {
  if(whichEvent === 'all') {
    const events = eventDb.get("SELECT * FROM events", (err, events) => {
      if (err) {
        return res.status(500).send({ message: "Internal server error" });
      }
    })

    return events
  }

  if (whichEvent === 'one') {
    const event = eventDb.get("SELECT * FROM events WHERE id = ?", [eventId], (err, event) => {
      if (err) {
        return res.status(500).send({ message: "Internal server error" });
      }
    })

    return event
  }
}

module.exports = getEvents