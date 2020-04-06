const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        link TEXT NOT NULL
    );`)
    
    const query = `INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?);`
    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Cursos de Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima perspiciatis illo autem at eum voluptas",
        "https://google.com"
    ]

    // db.run(query, values, (err) => {
    //     if(err) return console.error(err)
    // })

    // db.all(`SELECT * FROM ideas`, (err, rows) => {
    //     if(err) return console.error(err)

    //     console.log(rows)
    // })
})

module.exports = db