async function validateIfUserExists(userDb, username, { asPromise = false }) {
  if (asPromise === false) {
    userDb.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if (err) {
        return res.status(500).send({ message: "Internal server error" });
      }
      
      if (user) {
        true
      }
      
      return false
    });
  } else {
    const user = await new Promise((resolve, reject) => {
      userDb.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) reject(err); // Erro ao acessar o banco
        resolve(row); // Retorna o usuário encontrado
      });
    })

    if (user) {
      return true
    }

    return false
  }
}

module.exports = validateIfUserExists