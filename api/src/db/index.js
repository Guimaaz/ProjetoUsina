const sqlite3 = require('sqlite3').verbose()

const userDb = new sqlite3.Database('./src/db/users.db')
const eventDb = new sqlite3.Database('./src/db/events.db')
const newsDb = new sqlite3.Database('./src/db/news.db')

userDb.serialize(() => {
  // CRIANDO TABELA DE USUÁRIOS
  userDb.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)")
})

eventDb.serialize(() => {
  // CRIANDO TABELA DE EVENTOS
  eventDb.run("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, content TEXT, image TEXT, eventDate TEXT)")
})

newsDb.serialize(() => {
  // CRIANDO TABELA DE NOTÍCIAS
  newsDb.run("CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, image TEXT)")
})

module.exports = {
  userDb,
  eventDb,
  newsDb
}