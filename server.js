const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

// express osaa hakea index.html ilman tätä
//app.get('/', (req, res) => res.sendFile("public/index.html", { root: __dirname }))

app.post('/', (req, res) => console.log("post"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

