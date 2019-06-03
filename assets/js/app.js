/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
window.$ = document.querySelector.bind(document);
window.$$ = document.getElementById.bind(document);


var scores,
    roundScore,
    activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

newGame();


$('.dice').style.display = 'none';

$('.btn-roll').addEventListener('click', function() {
    // 1. gen a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    if (dice === 1) {
        $('.dice').src = 'assets/pic/dice-' + dice + ".png";
        $('#current-' + activePlayer).textContent ='0';
        playerChange();
        // console.log("active player is: " + activePlayer);
    } else {
    // 2. display result
    $('.dice').style.display = 'block';
    $('.dice').src = 'assets/pic/dice-' + dice + ".png";

    //3. update the round score IF the roll is not a 1.
    roundScore = Number($('#current-' + activePlayer).textContent) + dice;
    $('#current-' + activePlayer).textContent = roundScore;
    };
} )

$('.btn-hold').addEventListener('click', function(){
    console.log('Active Player: ' + activePlayer, 'Score: ' + scores[activePlayer], 'Round Score: ' + roundScore);
    scores[activePlayer] += roundScore;
    $$('score-' + activePlayer).textContent = scores[activePlayer];
    // $('#score-' + activePlayer).textContent = Number($('#score-' + activePlayer).textContent) + Number($('#current-' + activePlayer).textContent);
    $('#current-' + activePlayer).textContent = '0';
    console.log($('#score-' + activePlayer));
    checkWinner(); 
    // console.log("active player: " + activePlayer);
})


function playerChange() {
    $('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    $('.player-'+activePlayer+'-panel').classList.toggle('active');
    
}

$('.btn-new').addEventListener('click', function(){
    newGame();
})

function newGame() {
    $('.dice').style.display = 'none';
    $$('score-0').textContent = '0';
    $$('score-1').textContent = '0';
    $$('current-0').textContent = '0';
    $$('current-1').textContent = '0';
    $$('name-0').textContent = 'PLAYER 1';
    $('.player-0-panel').classList.add('active');
    $('.player-1-panel').classList.remove('active');
    $$('name-1').textContent = 'PLAYER 2';
    $('.btn-roll').style.display = 'block';
    $('.btn-hold').style.display = 'block';
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
}

function checkWinner() {
    if (scores[activePlayer] >= 100) {
        $$('name-' + activePlayer).textContent = "WINNER";
        $('.btn-roll').style.display = 'none';
        $('.btn-hold').style.display = 'none';
    } else {
        playerChange();
    }
}