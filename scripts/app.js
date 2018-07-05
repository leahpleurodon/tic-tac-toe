let gridUI = document.querySelector(".grid");
let announcementUI = document.querySelector(".announcements");
let startButton = document.getElementById("start-btn");
let resetButton = document.getElementById("reset-btn");
let currentPlayer = "x";
let playerSquares = {
    x:[],
    o:[]
};
let players = {
    x: {name:"x", token:"../images/X.png",score:0},
    o: {name:"o", token:"../images/O.png",score:0}
}

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
    announce(currentPlayer + " begins...");
    gridUI.addEventListener("click",takeTurn);
};

const startGame = () => {
    startButton.classList.toggle("hidden")
    gridUI.addEventListener("click",takeTurn);
    announce(currentPlayer + " begins...");
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
            announce(currentPlayer + "'s turn...");
        }else if(!getWinningCombo() && noMoreMoves()){
            announce("Game over, it's a tie...");
            endGame() 
        }else{
            showWinningLine(winningLine);
            announce(currentPlayer + " WINS!");
            players[currentPlayer].score += 1;
            changePlayer();
            endGame();
        };        
    };
};

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
announce("Welcome to tic-tac-toe...");