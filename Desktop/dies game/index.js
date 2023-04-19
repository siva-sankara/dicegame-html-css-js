var player1score = 0;

var player2score = 0;
alert("its just a dice game 😍")

var playerscore1 = document.getElementById("plr1sc");

var playerscore2 = document.getElementById("plr2sc");

var btn1 = docu.querySelector(".btn1");

function dail() {
    var randomNumber1 = Math.floor(Math.random() * 6) + 1;

    var randomDiceImage = "dice" + randomNumber1 + ".png";

    var randomImageSoource = "images/" + randomDiceImage;

    var image1 = document.querySelectorAll("img")[0];

    image1.setAttribute("src", randomImageSoource);

    document.querySelector(".heading").innerHTML = "player 2 have to roll";

    player1score = randomNumber1;

    playerscore1.innerHTML = `score :${player1score}`;


}
function dail2() {

    var randomNumber2 = Math.floor(Math.random() * 6) + 1;

    var randomDiceImage2 = "dice" + randomNumber2 + ".png";

    var randomImageSoource2 = "images/" + randomDiceImage2;

    var image2 = document.querySelectorAll("img")[1].setAttribute("src", randomImageSoource2);
    player2score = randomNumber2;
    playerscore2.innerHTML = `score :${player2score}`;

}

function compare() {
    if (player1score > player2score) {
        document.querySelector("h1").innerHTML = "🚩 Player 1 wins...!";

    } else if (player1score < player2score) {
        document.querySelector("h1").innerHTML = " 🚩 Player 2 wins...!";
    }
    else {
        document.querySelector("h1").innerHTML = " Draw";
    }
    setTimeout(function(){
        document.querySelector("h1").innerHTML = " Refresh Me";
        player1score =0;
        player2score=0;
        playerscore1.innerHTML = `score :${player1score}`;
        playerscore2.innerHTML = `score :${player2score}`;
    },3000);
}
