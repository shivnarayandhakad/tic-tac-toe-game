const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#resent-Btn');
const NewGameBtn = document.querySelector('#new-btn');
const msg = document.querySelector('#msg');
const msgContainer = document.querySelector('.msg-container');
let turn0 = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === '') {
            box.innerText = turn0 ? 'O' : 'X';
            turn0 = !turn0;
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = '';
    });
}

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const resetGame = () => {
    turn0 = true;
    msgContainer.classList.add('hide');
    enableBoxes();
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningConditions) {
        const [a, b, c] = pattern;
        const pos1Val = boxes[a].innerText;
        const pos2Val = boxes[b].innerText;
        const pos3Val = boxes[c].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    if ([...boxes].every(box => box.innerText !== '')) {
        msg.innerText = "It's a tie!";
        msgContainer.classList.remove('hide');
    }
};

resetBtn.addEventListener('click', resetGame);
NewGameBtn.addEventListener('click', resetGame);