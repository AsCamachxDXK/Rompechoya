const correctOrder = [];
const board = document.getElementById("board");
const pieces = document.getElementById("pieces");
const message = document.getElementById("message");
const completedPuzzle = document.getElementById("completedPuzzle");

function createPuzzle() {
    let indexes = [...Array(9).keys()];
    indexes = indexes.sort(() => Math.random() - 0.5);

    indexes.forEach((index) => {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = "url('heart.png')";
        piece.style.backgroundPosition = "-" + (index % 3) * 100 + "px -" + Math.floor(index / 3) * 100 + "px";
        piece.setAttribute("draggable", true);
        piece.dataset.index = index;
        correctOrder.push(index);

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", dropPiece);

        pieces.appendChild(piece);
    });
}

let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function dropPiece(event) {
    let target = event.target;
    if (target.classList.contains("piece") && draggedPiece !== target) {
        let tempIndex = draggedPiece.dataset.index;
        draggedPiece.dataset.index = target.dataset.index;
        target.dataset.index = tempIndex;

        let tempStyle = draggedPiece.style.backgroundPosition;
        draggedPiece.style.backgroundPosition = target.style.backgroundPosition;
        target.style.backgroundPosition = tempStyle;

        let parent = target.parentNode;
        parent.insertBefore(draggedPiece, target.nextSibling);
    }
}

function checkPuzzle() {
    let pieces = Array.from(document.querySelectorAll("#pieces .piece"));
    let isCorrect = pieces.every((piece, index) => parseInt(piece.dataset.index) === index);

    if (isCorrect) {
        message.textContent = "¡Rompecabezas completado!";
        movePuzzle();
    } else {
        message.textContent = "Aún no está completo.";
    }
}

function movePuzzle() {
    let piecesContainer = document.getElementById("pieces");
    piecesContainer.style.display = "none"; 
    board.style.display = "none"; 

    completedPuzzle.classList.remove("hidden");
}

function checkQuiz() {
    let quizForm = document.getElementById("quizForm");
    let answers = quizForm.querySelectorAll("input[type='radio']:checked");

    if (answers.length < 3) {
        document.getElementById("quizMessage").textContent = "Debes responder todas las preguntas.";
        return;
    }

    let allCorrect = Array.from(answers).every(answer => answer.value === "correct");

    if (allCorrect) {
        document.getElementById("quizMessage").textContent = "¡Felicidades! Completaste todo correctamente.";
        document.getElementById("quizMessage").style.color = "green";
    } else {
        document.getElementById("quizMessage").textContent = "Algunas respuestas son incorrectas. Intenta de nuevo.";
        document.getElementById("quizMessage").style.color = "red";
    }
}

createPuzzle()