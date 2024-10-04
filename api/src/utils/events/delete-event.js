function deleteEvent(eventDb, eventId) {
  eventDb.run("DELETE FROM events WHERE id = ?", [eventId], (err) => {
    if (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  })

  return true
}

module.exports = deleteEvent