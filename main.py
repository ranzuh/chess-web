import chess
import sys
import search
import json
import time

fen = sys.argv[1]
depth = int(sys.argv[2])

board = chess.Board(fen)

start_time = time.time()
computer_move = search.alpha_beta_decision(board, depth)
time_elapsed = time.time() - start_time

#board.push(computer_move)
#sys.stdout.write(board.fen())
payload = json.dumps({
  'move': board.san(computer_move),
  'nodes_visited': search.alphabeta_position_count,
  'time_elapsed': time_elapsed
})

sys.stdout.write(payload)

#sys.stdout.write(board.san(computer_move))