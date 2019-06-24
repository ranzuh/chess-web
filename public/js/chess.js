var board = null
var game = new Chess()

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false
  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function onChange () {
  console.log("Current pos:", game.fen())
  updateStatus()
}

function computerMove () {
  let depthSelector = document.getElementById("depth")
  let depth = depthSelector.options[depthSelector.selectedIndex].value

  axios.post('/move', {
    position: game.fen(),
    depth: depth
  })
  .then(function (response) {
    let move = response.data.move
    let nodes = response.data.nodes_visited
    let time = response.data.time_elapsed
    console.log("Response:", response.data);
    game.move(move)
    board.position(game.fen())
    document.getElementById("time").innerHTML = time.toFixed(2)
    document.getElementById("nodes").innerHTML = nodes
    document.getElementById("nps").innerHTML = Math.floor(nodes / time)

  })
  .catch(function (error) {
    console.log(error);
  });
}

function makeRandomMove () {
  var possibleMoves = game.moves()

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  // make random legal move for black
  //window.setTimeout(makeRandomMove, 250)
  window.setTimeout(computerMove, 0)
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  document.querySelector("#status").innerHTML = status
  document.querySelector("#fen").innerHTML = game.fen()
  document.querySelector("#pgn").innerHTML = game.pgn()

}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  onChange: onChange
}
board = Chessboard('board', config)


