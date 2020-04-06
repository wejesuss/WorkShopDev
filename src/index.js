const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const app = express()

const db = require('../db')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

nunjucks.configure("src/views", {
    autoescape: false,
    noCache: true,
    express: app 
})

app.get('/', (req, res) => {
    db.all(`SELECT * FROM ideas`, (err, rows) => {
        if(err) {
            console.error(err)
            return res.send('Erro inesperado no banco de dados, tente novamente.')
        }

        const reversedIdeas = [...rows].reverse()
        const lastIdeas = []
    
        for (const idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas })
    })
    
})

app.get('/ideias', (req, res) => {
    db.all(`SELECT * FROM ideas`, (err, rows) => {
        if(err) {
            console.error(err)
            return res.send('Erro inesperado no banco de dados, tente novamente.')
        }
        
        const reversedIdeas = [...rows].reverse()

        return  res.render("ideias.html", { ideas: reversedIdeas })
    })
})

app.post('/ideas', (req, res) => {
    Object.keys(req.body).map(key => {
        if(req.body[key] == '') return res.send('Preencha todos os campos')
    })

    const { image, title, category, description, link } = req.body
    const query = `INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?);`

    const values = [
        image,
        title,
        category,
        description,
        link
    ]

    db.run(query, values, (err) => {
        if(err) return console.error(err)

        return res.redirect('/ideias')
    })
})

app.delete('/ideas', (req, res) => {
    const { id } = req.body

    db.run(`DELETE FROM ideas WHERE id = ?`, [id],  (err) => {
        if(err) return console.error(err)

        return res.redirect('/ideias')
    })
})

app.listen(3000, () => {

})