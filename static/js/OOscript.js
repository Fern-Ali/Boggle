// JavaScript source code --- REFACTORED 4.2.2023 Scaleable Fern-Ali

class Boggle {
    constructor(score, timer) {

        ///INITIALIZE CLASS VALUES, SCORE AND TIMER////

        this.score = score;
        this.timer = timer;
        this.responses = [];
        this.gameTime = timer * 1000;


        ///ADD GAME TIMER FOR [THIS.TIMER] SECONDS////
        this.counter = setInterval(this.countDown.bind(this), 1000);

        ///ADD EVENT TIMER FOR GAMETIME DURATION////
        this.gameOver = setTimeout(this.endGame.bind(this), this.gameTime);

        ///ADD EVENT LISTENER TO GUESS BUTTON////
        $("#guess").on("click", this.boggleGuess.bind(this));
    }

    

    async boggleGuess() {

        /////*TAKE GUESS FROM FORM, SEND PARAMS TO CHECK-WORD ROUTE*/////

        let guess = $("#guess-form").val();
        let responseBack = await axios.get("/check-word", { params: { word: guess } });
        let jsonresponse = responseBack.json;
        console.log(guess);

        /////*CLEAR FORM AFTER SUBMIT*/////

        $("#guess-form").val("")

        /////*OUR_RESPONSE IS CHECKED TO SEE IF ITS A VALID GUESS VIA BOGGLE.PY*/////

        let our_response = responseBack.data['valid'];

        ////INITIALIZE MSG VARIABLE TO DISPLAY RESULT OF GUESS MSG/////

        let msg = $("#flash_msg")

        ////DEPENDING ON OUR_RESPONSE VALUE, DISPLAY APPROPRIATE MSG/////

        if (our_response == "ok") {

            if (this.responses.includes(guess) || this.timer == 0) {
                return
            }
            msg.removeClass('error')
            msg.addClass('success')
            let guessPoints = guess.length;
            msg.text(`You guessed ${guess}! Add ${guessPoints} points!`)
            this.responses.push(guess)
            this.score = this.score + guess.length;
            console.log(this.score)
            let appendToMe = $("#point_tracker").text(`Points: ${this.score}`);


        } else if (our_response !== "ok" && this.timer !== 0) {
            msg.removeClass('success')
            msg.addClass('error')
            msg.text(`BoggleBOT says: "${our_response}"!`)

        } else if (this.timer == 0) {
            $("#navlink1").text("Play again?")
            return
        }


    }

    
    
    ///FUNCTION TO GIVE END GAME MESSAGE AND CHANGE HOME LINK TO PLAY AGAIN////
    endGame() {

        let msg = $("#flash_msg");
        msg.text(`Game is over! You got ${this.score} points!`);
        $("#navlink1").text("Play again?");

    }

    ///ADDING COUNTDOWN TIMER FOR BOGGLE GAME////
    async countDown() {
        this.timer = this.timer - 1;
        let h2 = $("#time_header");
        h2.text(`Time left: ${this.timer} seconds.`);
        if (this.timer == 0) {
            clearInterval(this.counter);
        }
    }

    
    
}

    

  

    


///ADD YOUR BOGGLE GAME PARAMETERS HERE////
let game = new Boggle(0, 60);






