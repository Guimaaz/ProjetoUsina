const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db');

async function login(app) {
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      // Convertendo db.get para Promise para trabalhar melhor com async/await
      const user = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
          if (err) reject(err); // Erro ao acessar o banco
          resolve(row); // Retorna o usuário encontrado
        });
      });

      // Verifica se o usuário existe
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }

      // Verifica se a senha está correta
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid password" });
      }

      // Gera um token JWT
      const token = jwt.sign({ id: user.id }, 'shouldnotpass123', {
        expiresIn: 86400, // Token expira em 24 horas
      });

      console.log("Login successful, token generated:", token); // Verificação do token no log
      
      // Envia a resposta com o token
      return res.status(200).send({
        message: "Login successful",
        token: token
      });
      
    } catch (err) {
      console.error("Error during login:", err); // Loga qualquer erro durante o processo
      return res.status(500).send({ message: "Internal server error" });
    }
  });
}

module.exports = login;