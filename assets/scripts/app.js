let gridUI = document.querySelector(".grid");
let announcementUI = document.querySelector(".announcements");
let startButton = document.getElementById("start-btn");
let resetButton = document.getElementById("reset-btn");
let scoresUI = document.querySelector(".scores");
let scoreXnameUI = document.querySelector(".playerx-name");
let scoreXscoreUI = document.querySelector(".playerx-score");
let scoreOnameUI = document.querySelector(".playero-name");
let scoreOscoreUI = document.querySelector(".playero-score");
let currentPlayer = "x";
let playerSquares = {
    x:[],
    o:[]
};

let players = {
    x: {name:"x",score:0, sound: new Audio("assets/sounds/clickOn.wav")},
    o: {name:"o",score:0, sound: new Audio("assets/sounds/clickOff.wav")}
};
let playerXname = prompt("Enter a name for player X");
let playerOname = prompt("Enter a name for player O");

const winCombos = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,5,7],
    [3,6,9],
    [4,5,6],
    [7,8,9]
];

const clearBoard = () => {
    playerSquares["x"] = [];
    playerSquares["o"] = [];
    for(let sq = 1; sq < 10; sq++){
        document.getElementById(sq).className = "";
    };
};

const announce = (announement) => {
    announcementUI.textContent = announement;
};

const resetGame = () => {
    resetButton.classList.toggle("hidden");
    clearBoard();
    announce(players[currentPlayer].name + " begins...");
    gridUI.addEventListener("click",takeTurn);
};

const startGame = () => {
    startButton.classList.toggle("hidden");
    gridUI.addEventListener("click",takeTurn);
    announce(players[currentPlayer].name + " begins...");
};
const endGame = () =>{
    gridUI.removeEventListener("click",takeTurn);
    resetButton.classList.toggle("hidden");
};

const changePlayer = () => {
    currentPlayer = (currentPlayer === "x" ? "o" : "x");
};

const noMoreMoves = () => {
    let moves = playerSquares["x"].length + playerSquares["o"].length
    return (moves > 8 ? true : false);
};

const markSquare = (event) =>{
    let square = event.target.id;
    event.target.classList.add(currentPlayer);
    players[currentPlayer].sound.play();
    playerSquares[currentPlayer].push(Number(square));
};

const getWinningCombo = () =>{
    let winner = false;
    winCombos.forEach(combo =>{
        let matches = 0;
        combo.forEach(element =>{
            if(playerSquares[currentPlayer].indexOf(element) > -1){
                matches ++
            };
        });
        if(matches == 3){
            winner = combo;
        };
    });
    return winner;
};

const showWinningLine = (winningLine) =>{
    winningLine.forEach(square =>{
        document.getElementById(square).classList.add("win-tile");
    });
};

const takeTurn = (event) =>{
    if(event.target.classList.length === 0){
        markSquare(event);
        winningLine = getWinningCombo()
        if(!getWinningCombo() && !noMoreMoves()){
            changePlayer();
            announce(players[currentPlayer].name + "'s turn...");
        }else if(!getWinningCombo() && noMoreMoves()){
            announce("Game over, it's a tie...");
            endGame() 
        }else{
            showWinningLine(winningLine);
            announce(players[currentPlayer].name + " WINS!");
            players[currentPlayer].score += 1;
            scoreXscoreUI.textContent = players.x.score;
            scoreOscoreUI.textContent = players.o.score;
            changePlayer();
            endGame();
        };        
    };
};

const initialSetup = () =>{
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
    players.x.name = (playerXname === "" || playerXname === null ? "x" : playerXname);
    players.o.name = (playerOname === "" || playerOname === null ? "o" : playerOname);
    scoreXnameUI.textContent = players.x.name;
    scoreOnameUI.textContent = players.o.name;
    announce("Welcome to tic-tac-toe...");
};

initialSetup();