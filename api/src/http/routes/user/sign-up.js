const bcrypt = require('bcryptjs');
const { userDb } = require('../../../db');

import validateIfUserExists from '../../../utils/auth/validate-if-user-exists';

async function signUp(app) {
  app.post('/auth/signup', async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send({ message: "Invalid username or password" })
      }
      
      const hashedPassword = bcrypt.hashSync(password, 8);
      
      // Verifica se o usuário já existe
      const userExists = validateIfUserExists()

      if(userExists) {
        return res.status(400).send({ message: `User "${username}" already exists` })
      }

      createUser(userDb, { username, hashedPassword });
    } catch (err) {
      throw new Error('Error creating user', err)
    }
  });
}

module.exports = signUp;
