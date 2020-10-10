function rightNeighbor(rowNum, colNum, board, cellX, cellY) {
    if (cellX === colNum - 1)
        return false;
    return board[(rowNum * (cellX + 1)) + cellY];
}

function leftNeighbor(rowNum, board, cellX, cellY) {
    if (cellY === 0)
        return false;
    return board[(rowNum * (cellX - 1)) + cellY];
}

function upperNeighbor(rowNum, board, cellX, cellY) {
    if (cellY === 0)
        return false;
    return board[(rowNum * cellX) + cellY - 1];
}

function lowerNeighbor(rowNum, board, cellX, cellY) {
    if (cellY === rowNum - 1)
        return false;
    return board[(rowNum * cellX) + cellY + 1];
}

function upperRightNeighbor(rowNum, colNum, board, cellX, cellY) {
    if (cellY === 0 || cellX === colNum - 1)
        return false;
    return board[(rowNum * (cellX + 1)) + (cellY - 1)];
}

function lowerRightNeighbor(rowNum, colNum, board, cellX, cellY) {
    if (cellY === rowNum - 1 || cellX === colNum - 1)
        return false;
    return board[(rowNum * (cellX + 1)) + (cellY + 1)];
}

function upperLeftNeighbor(rowNum, board, cellX, cellY) {
    if (cellX === 0 || cellY === 0)
        return false;
    return board[(rowNum * (cellX - 1)) + (cellY - 1)];
}

function lowerLeftNeighbor(rowNum, board, cellX, cellY) {
    if (cellX === 0 || cellY === rowNum - 1)
        return false;
    return board[(rowNum * (cellX - 1)) + (cellY + 1)];
}


function getNextState(rowNum, colNum, board, cellX, cellY) {
    let nbrs = [];
    let neighborNumber = 0;
    if (upperNeighbor(rowNum, board, cellX, cellY)) {
        nbrs.push("upper");
        neighborNumber++;
    }
    if (lowerNeighbor(rowNum, board, cellX, cellY)) {
        nbrs.push("lower");

        neighborNumber++;
    }
    if (leftNeighbor(rowNum, board, cellX, cellY)) {
        nbrs.push("left");

        neighborNumber++;
    }
    if (rightNeighbor(rowNum, colNum, board, cellX, cellY)) {
        nbrs.push("right");

        neighborNumber++;
    }
    if (upperLeftNeighbor(rowNum, board, cellX, cellY)) {
        nbrs.push("upperLeft");

        neighborNumber++;
    }
    if (upperRightNeighbor(rowNum, colNum, board, cellX, cellY)) {
        nbrs.push("upperRight");

        neighborNumber++;
    }
    if (lowerLeftNeighbor(rowNum, board, cellX, cellY)) {
        nbrs.push("lowerLeft");

        neighborNumber++;
    }
    if (lowerRightNeighbor(rowNum, colNum, board, cellX, cellY)) {
        nbrs.push("lowerRight");

        neighborNumber++;
    }
    /*
    if (cellX === 1)
        console.log({
            isAlive: (rowNum * (cellX - 1)) + (cellY - 1),
            cellY: cellY,
            neighborNumber: neighborNumber,
            nbrs: nbrs
        });

     */

    if (board[rowNum * cellX + cellY]) {
        switch (neighborNumber) {
            case 0:
            case 1:
                return false;
            case 2:
            case 3:
                return true;
            default:
                return false;
        }
    } else {
        return neighborNumber === 3;
    }
}

export default function getNextBoard(rowNum, colNum, board) {

    let newBoard = [];
    board.forEach((_, index) => {
        newBoard.push(getNextState(
            rowNum, colNum, board,
            (Math.floor(index / rowNum)),
            (index % rowNum)));
    });
    //console.log("----------------");
    return newBoard;
}

