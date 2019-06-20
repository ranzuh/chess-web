const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())

// express osaa hakea index.html ilman tätä
//app.get('/', (req, res) => console.log("get"))


app.post('/move', function (req, res) {
  let oldPos = req.body.position
  requestMove(oldPos, (newPos) => {
    res.send(newPos)
  })
  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function requestMove (pos, callback) {
  const { spawn } = require('child_process');
  python = spawn('python3', ["main.py", pos])

  let newPos = ""
  python.stdout.on('data', (data) => {
    newPos = JSON.parse(data)
    callback(newPos)
  })
}

