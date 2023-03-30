from boggle import Boggle

boggle_game = Boggle()
OUR_BOARD = ""

from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from flask import Markup

import math

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/', methods=["POST", "GET"])
def index():
    """Return homepage."""
    #import pdb
    #pdb.set_trace()
    return redirect('/home')


@app.route('/home', methods=["POST", "GET"])
def index_home():
    """Return homepage."""
    session[OUR_BOARD] = ''
    board_length = ''
    if request.method == 'POST':
        our_board = Boggle.make_board(Boggle)
        board_length = len(our_board)
    #import pdb
    #pdb.set_trace()
        session[OUR_BOARD] = our_board
        #flash(f"You have started a new BOGGLE game!", 'success')
        return redirect('/game')
    return render_template('board.html', board = session[OUR_BOARD], board_length = board_length)


@app.route('/game', methods=["POST", "GET"])
def index_game():
    """Return homepage."""
    flash(f"You have started a new BOGGLE game!", 'success')
    session[OUR_BOARD] = session[OUR_BOARD]
    board_length = len(session[OUR_BOARD])
    words = Boggle.read_dict(Boggle, "words.txt")

    word = request.args.get('word')
    
    #response = Boggle.check_valid_word(session[OUR_BOARD], word)
    #import pdb
    #pdb.set_trace()

    
    
    
    if request.method == 'POST':
        
    
        session[OUR_BOARD] = session[OUR_BOARD]
        board_length = len(session[OUR_BOARD])
        flash(f"You guessed guess for 100 points!", 'success')
        
        our_guess = request.form
    
        
    return render_template('game.html', board = session[OUR_BOARD], board_length = board_length, Boggle=Boggle)


@app.route("/check-word", methods=["POST", "GET"])
def check_word():
    """Check if word is in dictionary."""

    word = request.args['word']
    #board = session["OUR_BOARD"]
    #response = Boggle.check_valid_word(board, word)
    
    response_is_valid = boggle_game.check_valid_word(session[OUR_BOARD], word)
    response_is_found = boggle_game.find(session[OUR_BOARD], word)


    #import pdb
    #pdb.set_trace()
    #flash(f"{response_is_valid} to use {word}", 'success')

    return jsonify({'result': word, 'valid':response_is_valid, 'found':response_is_found })