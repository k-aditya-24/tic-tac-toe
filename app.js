// Get the modal
let modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function openModal() {
  modal.style.display = "block";
};

let modalContentText = document.querySelector(".modal-content-text");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};





let clickBoxes = document.querySelectorAll(".click-box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");


let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableclickBoxes();
};

clickBoxes.forEach((clickBox) => {
    clickBox.addEventListener("click", () => {
    if (turnO) {
      //playerO
      clickBox.innerText = "O";
      turnO = false;
    } else {
      //playerX
      clickBox.innerText = "X";
      turnO = true;
    }
    clickBox.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  modalContentText.innerText = `It's a draw. Try another game.`;
  openModal();
  disableclickBoxes();
};

const disableclickBoxes = () => {
  for (let clickBox of clickBoxes) {
    clickBox.disabled = true;
  }
};

const enableclickBoxes = () => {
  for (let clickBox of clickBoxes) {
    clickBox.disabled = false;
    clickBox.innerText = "";
  }
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = clickBoxes[pattern[0]].innerText;
    let pos2Val = clickBoxes[pattern[1]].innerText;
    let pos3Val = clickBoxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

const showWinner = (winner) => {
  if(winner === "O"){
    modalContentText.innerText = `Congratulations, Player 1 wins.`;
  }
  else{
    modalContentText.innerText = `Congratulations, Player 2 wins.`;
  }
  disableclickBoxes();
  openModal();
};

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",function() {
  modal.style.display = "none";
});