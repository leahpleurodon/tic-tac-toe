let grid = document.querySelector(".grid");
xTurn = true;

const claimSquare = (event) =>{
    if(event.target.className === ""){
        if(xTurn){
            event.target.classList.add("x");
            xTurn = false;
        }else{
            event.target.classList.add("o");
            xTurn = true;
        };
    };
};

grid.addEventListener("click",claimSquare);