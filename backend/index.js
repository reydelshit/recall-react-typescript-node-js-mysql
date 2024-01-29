import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
const port = 8800

const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'reydel',
    database: 'test'
})

// auth problem with mysql

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'reydel';

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello")
})


// all books 
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"
    databaseConnection.query(query, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// specific books 
app.get("/books/:id", (req, res) => {
    const query = "SELECT * FROM books WHERE id = ?"
    const id = req.params.id
    databaseConnection.query(query, id, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    databaseConnection.query(query, [values] , (err, data) => {
        if(err) return res.json(err)
        return res.json({
        ...data,
        message: "succesfully added"
        })
    })
})

app.delete("/books/:id", (req, res) => {
    const query = "DELETE FROM books WHERE id = ?"
    const id = req.params.id

    databaseConnection.query(query, id, (err, data) => {
        if(err) return res.json(err)
        return res.json('succesfully deleted')
    })
})


app.put(`/books/update/:id`, (req, res) => {
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const id = req.params.id
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    databaseConnection.query(query, [...values, id] , (err, data) => {
        if(err) return res.json(err)
        return res.json({
        ...data,
        message: "succesfully updated"
        })
    })
})




app.listen(port, () => {
    console.log('Backend server is running!', port)
})