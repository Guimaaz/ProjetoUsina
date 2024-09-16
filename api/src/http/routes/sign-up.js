const bcrypt = require('bcryptjs');
const db = require('../../db');

async function signUp(app) {
  app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Verifica se o usuário já existe
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) {
          return res.status(500).send({ message: "Internal server error" });
        }
        
        if (user) {
          return res.status(400).send({ message: "User already exists" });
        }
        
        // Gera o hash da senha
        const hashedPassword = bcrypt.hashSync(password, 8);
        
        // Insere o novo usuário no banco de dados
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
          if (err) {
            return res.status(500).send({ message: "Error creating user" });
          }
          return res.status(201).send({ message: "User created successfully" });
        });
      });
    } catch (err) {
      throw new Error('deu pau no criar conta', err)
    }
  });
}

module.exports = signUp;
