import chess
import sys
from search import alpha_beta_decision

board = chess.Board(sys.argv[1])
computer_move = alpha_beta_decision(board, 3)
#board.push(computer_move)
#sys.stdout.write(board.fen())
sys.stdout.write(board.san(computer_move))
