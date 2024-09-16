import bcrypt from 'bcryptjs'
import db from '../../db'

export async function signUp(app) {
  app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if(user) {
        return res.status(400).send({ message: 'User already exists' })
      }

      const hashedPassword = bcrypt.hashSync(password, 8)

      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
        if(err) {
          return res.status(500).send({ message: 'Error creating user' })
        }

        res.status(201).send({ message: 'User created successfully' })
      })
    })
  })
}