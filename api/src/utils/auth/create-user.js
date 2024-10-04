function createUser(userDb, { username, hashedPassword }) {
  userDb.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
    if (err) {
      return res.status(500).send({ message: "Error creating user" });
    }
    return res.status(201).send({ message: "User created successfully" });
  });
}