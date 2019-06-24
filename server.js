const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())

// express osaa hakea index.html ilman tätä
//app.get('/', (req, res) => console.log("get"))


app.post('/move', function (req, res) {
  let position = req.body.position
  let depth = req.body.depth

  if(depth > 4) {
    res.status(400).send("Depth too deep")
    return false
  }

  requestMove(position, depth, (move) => {

    if(move === "error"){
      res.status(400)
    }
    else {
      res.send(move)
    }
  })
  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function requestMove (pos, depth, callback) {
  const { spawn } = require('child_process');
  python = spawn('python3', ["main.py", pos, depth])

  let move = ""
  python.stdout.on('data', (data) => {
    move = JSON.parse(data)
    callback(move)
  })
  python.stderr.on('data', () => {
    callback("error")
  })
}

