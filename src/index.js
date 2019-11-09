import bodyParser from 'body-parser'

const express = require('express')
const app = express()
const port = process.env.PORT

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const store = {
    count: 0,
}

app.get('/', (req, res) => {
    store.count = store.count + 1
    res.send(`Hello world: ${store.count}`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))