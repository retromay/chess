let legalSquares = [];

const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

// This function itrates over the array of board squares while checking for events of drag over and drop.This function is also responsible for give the them the id. eg. a1 b4 etc.

function setupBoardSquares() {
    for (let i = 0; i < boardSquares.length; i++) {
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 8 - Math.floor(i / 8);
        let column = String.fromCharCode(97 + (i % 8));// generates the position in letter which is column 
        let square = boardSquares[i];
        square.id = column + row;
    }
}

setupBoardSquares();

// This fucntion loops through the array of pieces. Then adds an event for drag start and makes them draggable by setting the attribute to true. Also we loop over images array and we set
// the draggable attribute to false so that only the pieces can be dragged and not the images.

function setupPieces() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id =
        pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }
    for (let i = 0; i < piecesImages.length; i++) {
        piecesImages[i].setAttribute("draggable", false);
    }
}
setupPieces();
  
// By default an element cannot be dropped on another element. Calling the prevent default method on the dragover event cancels the default behaviour. 
function allowDrop(ev) {
    ev.preventDefault();
}


// Drag function gets us the target of the event which is the piece elemet that is being dragged.The function also then calls the setData property on the dataTransfer property of 
// the event object and , setting the data type as text and the data of piece id. This will allow us to transfer the data during drag and drop operation.
function drag(ev) {
    const piece = ev.target;
    ev.dataTransfer.setData("text", piece.id);
}
  
// This function will retrieve the data that was set during the dragstart event by calling the methond getData on the dataTransfer property of the event object.
// It then retrieve the target positon where the drop happend and then assigns the destinationSquare variable.
// Then it will append the dragged elemet to the destination square eventually moving the piece to the new position.
function drop(ev){
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSquare = ev.currentTarget;
    let destinationSquareId = destinationSquare.id;
    destinationSquare.appendChild(piece);

} 