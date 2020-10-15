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
    let neighborNumber = 0;
    if (upperNeighbor(rowNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (lowerNeighbor(rowNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (leftNeighbor(rowNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (rightNeighbor(rowNum, colNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (upperLeftNeighbor(rowNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (upperRightNeighbor(rowNum, colNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (lowerLeftNeighbor(rowNum, board, cellX, cellY)) {
        neighborNumber++;
    }
    if (lowerRightNeighbor(rowNum, colNum, board, cellX, cellY)) {
        neighborNumber++;
    }

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
    return newBoard;
}

