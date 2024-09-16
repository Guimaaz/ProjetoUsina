import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../../db'

export async function login(app) {
  app.post('/login', async (req, res) => {
    const { username, password } = req.body

    db.get("SELECT * FROM user WHERE username = ?", [username], (err, user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password)
      
      if(!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password for this user' })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        message: 'Logged in successfully',
        token
      })
    })
  })
}