### BOGGLE - Like Scrabble, but fun!

- You'll need requirements.txt (Flask), deploy via local host.
	> pip install -r requirements.txt

- Obj oriented front-end with Javascript, CSS, HTML
	> Front-end logic to check if guess is valid can be found in OOscript.js -- 

	> Boggle class allows for specification of game timer, score 

	> Uses axios async method to send guess value to check-word route, which responds with validity status json

- Obj oriented, scalable back-end with Python3, Flask (jinja2) templating
	> Back-end logic to check if guess is valid can be found in boggle.py, and is deployed through app.py check-word route.

	> Check-route grabs + jsonify guess and validity result using imported boggle.py methods. 

- Functionality:
	
	>Submit guesses via text input, enter or click button to submit guess

	>If guess valid, points added to scoreboard, otherwise red msg

	>After time runs out, no more guesses, points are final. 

	>To play again, click first link in navbar after time runs out. Or go to root directory.

- Integration testing included
	> Multiple portions of this program are tested together to see if they work together as a group.

