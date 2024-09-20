const bcrypt = require('bcryptjs');
const { userDb } = require('../../../db');

async function signUp(app) {
  app.post('/auth/signup', async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send({ message: "Invalid username or password" })
      }
      
      // Verifica se o usuário já existe
      userDb.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) {
          return res.status(500).send({ message: "Internal server error" });
        }
        
        if (user) {
          return res.status(400).send({ message: "User already exists" });
        }
        
        // Gera o hash da senha
        const hashedPassword = bcrypt.hashSync(password, 8);
        
        // Insere o novo usuário no banco de dados
        userDb.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
          if (err) {
            return res.status(500).send({ message: "Error creating user" });
          }
          return res.status(201).send({ message: "User created successfully" });
        });
      });
    } catch (err) {
      throw new Error('Error creating user', err)
    }
  });
}

module.exports = signUp;
