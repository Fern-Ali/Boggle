// JavaScript source code

let h2 = document.getElementById("h2");
/*document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/5620839.jpg')";*/

const guessBtn = document.getElementById("guess");
let newQuery = document.getElementById('guess').value;
let responses = [];
let score = 0;
let timer = 60;
/*guessBtn.addEventListener("click", getGifData);*/
//const restartBtn = document.getElementById("remove");
//restartBtn.addEventListener("click", removeGifs);

async function getGifData() {
    const query = document.getElementById('guess-form').value;
    const searchTermURL = `http://localhost:5000/`;
    const response = await axios.get(searchTermURL);
    console.log(response);
    console.log(response.data);
    console.log(response.data.data);
    //const gifArray = response.data.data.images;



    //for (let result of response.data.data) {
    //    console.log(result.images.original.url);




    //    const ourGifData = result.images.original.url;
    //    const gif = document.createElement("img");

    //    gif.src = ourGifData;
    //    gif.id = "removeMe";
    //    const appendHere = document.getElementById('appendMe');
    //    appendHere.appendChild(gif);

    //}


}


//function showBorrow(res) {
//    $("#borrowed").html(res);
//}

async function borrowMoney() {
    let guess = $("#guess-form").val();

    //let response = await axios.post(
    //    "/check-word", { params: { word: guess } });

    //console.log("guess resp=", response);
    //console.log("guess resp.data=", response.config.data);
    //ourParams = response.config.data;
    //console.log(ourParams);

    let responseBack = await axios.get("/check-word", { params: { word: guess } });
    let jsonresponse = responseBack.json;
    console.log(responseBack.json)
    console.log(responseBack.config.params)
    console.log(responseBack)
    console.log(responseBack.data)
    console.log(responseBack.data['valid'])
    /*showBorrow(response.data)*/
    data = JSON.stringify(responseBack.config.params);
    $("#guess-form").val("")

    our_response = responseBack.data['valid']

    msg = $("#flash_msg")
   
    
    if (our_response == "ok") {

        if (responses.includes(guess) || timer == 0) {
            return
        }
        msg.removeClass('error')
        msg.addClass('success')
        let guessPoints = guess.length;
        msg.text(`You guessed ${guess}! Add ${guessPoints} points!`)
        responses.push(guess)
        score = score + guess.length;
        console.log(score)
        let appendToMe = $("#point_tracker").text(`Points: ${score}`);


    } else if (our_response !== "ok" && timer !== 0) {
        msg.removeClass('success')
        msg.addClass('error')
        msg.text(`BoggleBOT says: "${our_response}"!`)

    } else if (timer == 0) {
        $("#navlink1").text("Play again?")
        return
    }
        

    //const searchTermURL = `http://localhost:5000/`;
    //const response2 = await axios.get(searchTermURL);
    //console.log(response2);
    //console.log(response2.config.data);
    

}

$("#guess").on("click", borrowMoney);

setTimeout(endGame, 60000);
function endGame() {
    msg = $("#flash_msg")
    msg.text(`Game is over! You got ${score} points!`)
    $("#navlink1").text("Play again?")
    //$("#guess").unbind("click");
    //$("#guess-form").unbind();
    //$("#guess-form").submit(function (e) {
    //    return false;
    //});
}
function countDown() {
    timer = timer - 1;
    h2 = $("#h2")
    h2.text(`Time left: ${timer} seconds.`)
    if (timer == 0) {
        clearInterval(counter);
    }
}
let counter = setInterval(countDown, 1000)
//function removeGifs() {
//    let gifs = document.getElementById("removeMe");
//    gifs.remove();
//}


