function validateIfEventExists(eventDb, { name }) {
  eventDb.get("SELECT * FROM events WHERE name = ?", [name], (err, event) => {
    if(err) {
      return res.status(500).send({ message: "Internal server error" })
    }
    
    if (event) {
      return true
    }

    return false    
  })
}

module.exports = validateIfEventExists