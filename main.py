import chess
import sys
from search import alpha_beta_decision
import json

board = chess.Board(sys.argv[1])
computer_move = alpha_beta_decision(board, 3)
#board.push(computer_move)
#sys.stdout.write(board.fen())
payload = json.dumps({
  'move': board.san(computer_move)
})

sys.stdout.write(payload)

#sys.stdout.write(board.san(computer_move))