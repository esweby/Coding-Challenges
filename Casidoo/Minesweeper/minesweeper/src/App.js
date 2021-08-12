import React, { useState, useEffect } from 'react';

// Modules
import Row from './components/Row';

function App() {

  // Game Status made for critical decision steps
  const [ gameStatus, setGameStatus ] = useState({ data: {
    // Statuses
    gameStatuses: ['play', 'won', 'lost'],
    gameStatus: 0,
    // Mine details
    notMinesFlagged: 0,
    minesFlagged: 0,
    minesClicked: 0,
    totalMines: 0,
    // Normal squares
    squaresRevealed: -1,
    totalSquares: 1,
  }});

  const [ gameMessage, setGameMessage ] = useState('');
  
  const [ board, setBoard ] = useState([]);
  const [ boardSize, setBoardSize ] = useState(0);

  // Display rows
  const [ rows, setRows ] = useState('');
  
  // Game Data for game control
  useEffect(() => {
    const gameData = gameStatus.data;
    if(gameData.squaresRevealed > 0 && gameData.squaresRevealed === gameData.totalSquares && gameData.gameStatus !== 1) {
      gameData.gameStatus = 1;
      setGameMessage(`You have won! 
      How fulfilling :D`);
      setGameStatus({ data: gameData });
    }

  }, [ gameStatus ])
    
  // Generate the rows once a board is created 
  useEffect(() => {
    setRows(board.map((row, i) => <Row key={i} nextKey={i} row={row} leftClick={revealCell} rightClick={flagCell} />));
  }, [ board ]);

  // First time board creation
  useEffect(() => generateBoard(0), [ ]);

  // Function to pass through to change for select 
  const onChange = e => setBoardSize(e.target.value);

  // Function for right click = flag a cell as maybe has a mine
  const flagCell = (row, cell, cellData) => {
    if(cellData[1] === 'discovered') return;

    const tempboard = board;
    const gameData = gameStatus.data;
    
    if(cellData[1] === 'undiscovered') {
      tempboard[row][cell][1] = 'flagged';
      cellData[0] === '*' ? gameData.minesFlagged++ : gameData.notMinesFlagged++;
    } else {
      tempboard[row][cell][1] = 'undiscovered';
      cellData[0] === '*' ? gameData.minesFlagged-- : gameData.notMinesFlagged--;
    }

    setBoard([...tempboard]);
    setGameStatus({ data: gameData });
  }

  // Function to update cells with left click
  const revealCell = (row, cell, cellData) => {
    if(board[row][cell][1] === 'flagged') return;

    // Update the board with information
    const tempboard = board;
    tempboard[row][cell][1] = 'discovered';
    setBoard([...tempboard]);

    // Update the game data and game state
    const gameData = gameStatus.data;
    if(cellData[0] === '*') {
      gameData.gameStatus = 2;
      setGameMessage(`You have lost :( Try again!`);
    }
    if(cellData[0] === 0) {
      zeroBoom(row, cell);
    }
    
    let count = 0;
    for(let row of tempboard) {
      for(let col of row) {
        if(col[1] === 'discovered') count++;
      }
    }
    gameData.squaresRevealed = count;
    setGameStatus({ data: gameData });
  }

  // Create a new game board 
  const generateBoard = () => {

    // Different board types
    const boards = [
      { rows: 9, cols: 9, mines: 10 },
      { rows: 15, cols: 15, mines: 40 },
      { rows: 30, cols: 16, mines: 99 }
    ];
    
    // Arrays to hold the game for future updates
    const gameBoard = [];
    const mines = [];
    
    // Create mines and hold them in an array
    for(let i = 0; i < boards[boardSize].mines; i++) {
      let x = Math.floor(Math.random() * boards[boardSize].rows);
      let y = Math.floor(Math.random() * boards[boardSize].cols);
      mines.push([x, y]);
    }
    
    // Create the board 
    for(let newRow = 0; newRow < boards[boardSize].rows; newRow++) {
      const insertRow = [];
      for(let newCol = 0; newCol < boards[boardSize].cols; newCol++) insertRow.push(0);
      gameBoard.push(insertRow);
    }
    
    // Update the board with the created mines
    mines.forEach(mine => gameBoard[mine[0]][mine[1]] = ['*', 'undiscovered']);
    
    // Set the cells within the board
    for(let row = 0; row < gameBoard.length; row++) {
      for(let col = 0; col <gameBoard[row].length; col++) {
        if(gameBoard[row][col][0] === '*') continue;
        let counter = 0;
        
        // Row Above
        if(gameBoard[row - 1] !== undefined) {
          if(gameBoard[row - 1][col - 1] !== undefined && gameBoard[row - 1][col - 1][0] === '*') counter++; 
          if(gameBoard[row - 1][col] !== undefined && gameBoard[row - 1][col][0] === '*') counter++;
          if(gameBoard[row - 1][col + 1] !== undefined && gameBoard[row - 1][col + 1][0] === '*') counter++;
        }
        
        // Current Row
        if(gameBoard[row][col - 1]  !== undefined && gameBoard[row][col - 1][0] === '*') counter++; 
        if(gameBoard[row][col + 1] !== undefined && gameBoard[row][col + 1][0] === '*') counter++;
        
        // Row Below
        if(gameBoard[row + 1] !== undefined) {
          if(gameBoard[row + 1][col - 1] !== undefined && gameBoard[row + 1][col - 1][0] === '*') counter++; 
          if(gameBoard[row + 1][col] !== undefined && gameBoard[row + 1][col][0] === '*') counter++;
          if(gameBoard[row + 1][col + 1] !== undefined  && gameBoard[row + 1][col + 1][0] === '*') counter++;
        }
        // Set the row to an array
        gameBoard[row][col] = [counter, 'undiscovered'];
      }
    }
    // Update the state board
    setBoard([...gameBoard]);

    let squareCount = 0;
    let mineCount = 0;
    for(let row of board) {
      for(let col of row) {
        if(col[0] !== '*') squareCount++;
        if(col[0] === '*') mineCount++;
      }
    }

    // Update the state data
    const data = {
      gameStatuses: ['play', 'won', 'lost'],
      gameStatus: 0,
      notMinesFlagged: 0,
      minesFlagged: 0,
      minesClicked: 0,
      totalMines: mineCount,
      squaresRevealed: 0,
      totalSquares: squareCount,
    }
    setGameStatus({ data: data });
    setGameMessage(``);
  }

  // Reveal all the zeroes :D 
  const zeroBoom = (row, cell) => {
    const updatedBoard = board;
    const currentPoint = updatedBoard[row][cell];
    const gameData = gameStatus.data;

    if(currentPoint[0] === 0 && currentPoint[1] === 'discovered') {
      // Row aboves
      if(updatedBoard[row - 1] !== undefined) {
        // Left Above
        if(updatedBoard[row][cell - 1] !== undefined && 
          updatedBoard[row - 1][cell - 1][0] > 0 && 
          updatedBoard[row - 1][cell - 1][0] <= 8 && 
          updatedBoard[row - 1][cell - 1][1] === 'undiscovered') { 

          updatedBoard[row - 1][cell - 1][1] = 'discovered';
        }
        if(updatedBoard[row][cell - 1] !== undefined && 
          updatedBoard[row - 1][cell - 1][0] === 0 && 
          updatedBoard[row - 1][cell - 1][1] === 'undiscovered') {
          
          updatedBoard[row - 1][cell - 1][1] = 'discovered';
          zeroBoom(row - 1, cell - 1);

        }
        // Straight Above
        if(updatedBoard[row - 1][cell][0] > 0 && 
          updatedBoard[row - 1][cell][0] <= 8 && 
          updatedBoard[row - 1][cell][1] === 'undiscovered') { 
          
          updatedBoard[row - 1][cell][1] = 'discovered';
        }
        if(updatedBoard[row - 1][cell][0] === 0 && 
          updatedBoard[row - 1][cell][1] === 'undiscovered') { 
            
          updatedBoard[row - 1][cell][1] = 'discovered';
          zeroBoom(row - 1, cell);
        }
        // Right Above
        if(updatedBoard[row - 1][cell + 1] !== undefined && 
          updatedBoard[row - 1][cell + 1][0] > 0 && 
          updatedBoard[row - 1][cell + 1][0] <= 8 &&
          updatedBoard[row - 1][cell + 1][1] === 'undiscovered') { 
            
          updatedBoard[row - 1][cell + 1][1] = 'discovered';
        }
        if(updatedBoard[row - 1][cell + 1] !== undefined && 
          updatedBoard[row - 1][cell + 1][0] === 0 && 
          updatedBoard[row - 1][cell + 1][1] === 'undiscovered') {

          updatedBoard[row - 1][cell + 1][1] = 'discovered';
          zeroBoom(row - 1, cell + 1);
        }
      }

      // Current Row
      // Left of Current
      if(updatedBoard[row][cell - 1] !== undefined && 
        updatedBoard[row][cell - 1][0] > 0 && 
        updatedBoard[row][cell - 1][0] <= 8 &&
        updatedBoard[row][cell - 1][1] === 'undiscovered') {

        updatedBoard[row][cell - 1][1] = 'discovered';
      }
      if(updatedBoard[row][cell - 1] !== undefined && 
         updatedBoard[row][cell - 1][0] === 0 && 
         updatedBoard[row][cell - 1][1] === 'undiscovered') { // RECURSION
        
        updatedBoard[row][cell - 1][1] = 'discovered';
        zeroBoom(row, cell - 1);
      }
      // Right of Current
      if(updatedBoard[row][cell + 1] !== undefined && 
         updatedBoard[row][cell + 1][0] > 0 && 
         updatedBoard[row][cell + 1][0] <= 8 &&
         updatedBoard[row][cell + 1][1] === 'undiscovered') {

        updatedBoard[row][cell + 1][1] = 'discovered';
      }
      if(updatedBoard[row][cell + 1] !== undefined && 
         updatedBoard[row][cell + 1][0] === 0 && 
         updatedBoard[row][cell + 1][1] === 'undiscovered') { // RECURSION
        updatedBoard[row][cell + 1][1] = 'discovered';
        zeroBoom(row, cell + 1);
      }

      // Rows Below
      if(updatedBoard[row + 1] !== undefined) {
        // Left Below
        if(updatedBoard[row][cell - 1] !== undefined && 
          updatedBoard[row + 1][cell - 1][0] > 0 && 
          updatedBoard[row + 1][cell - 1][0] <= 8 &&
          updatedBoard[row + 1][cell - 1][1] === 'undiscovered') {
          updatedBoard[row + 1][cell - 1][1] = 'discovered';
        }
        if(updatedBoard[row][cell - 1] !== undefined && 
           updatedBoard[row + 1][cell - 1][0] === 0 && 
           updatedBoard[row + 1][cell - 1][1] === 'undiscovered') {
          updatedBoard[row + 1][cell - 1][1] = 'discovered';
          zeroBoom(row + 1, cell - 1);
        }
        // Straight Below
        if(updatedBoard[row + 1][cell][0] > 0 && 
          updatedBoard[row + 1][cell][0] <= 8 &&
          updatedBoard[row + 1][cell][1] === 'undiscovered') {
          updatedBoard[row + 1][cell][1] = 'discovered';
        }
        if(updatedBoard[row + 1][cell][0] === 0 && 
          updatedBoard[row + 1][cell][1] === 'undiscovered') {
          updatedBoard[row + 1][cell][1] = 'discovered';
          zeroBoom(row + 1, cell);
        }
        // Right Below
        if(updatedBoard[row][cell + 1] !== undefined && 
          updatedBoard[row + 1][cell + 1][0] > 0 && 
          updatedBoard[row + 1][cell + 1][0] <= 8 &&
          updatedBoard[row + 1][cell + 1][1] === 'undiscovered') {
          updatedBoard[row + 1][cell + 1][1] = 'discovered';
        }
        if(updatedBoard[row][cell + 1] !== undefined && 
           updatedBoard[row + 1][cell + 1][0] === 0 && 
           updatedBoard[row + 1][cell + 1][1] === 'undiscovered') {
          updatedBoard[row + 1][cell + 1][1] = 'discovered';
          zeroBoom(row + 1, cell + 1);
        }
      }
    }
    
    setBoard([...updatedBoard]);
    setGameStatus({ data: gameData });
  }
  
  return (
    <main className="container">
      <div className="buttons">
        <select className="select" onChange={e => onChange(e)} value={boardSize}>
          <option value="0">Easy</option>
          <option value="1">Medium</option>
          <option value="2">Hard</option>
        </select>
        <button onClick={() => generateBoard(0)}>New Game</button>
      </div>
      <div className={`board ${gameStatus.data.gameStatuses[gameStatus.data.gameStatus]}`}>
        {rows}
        <div className="modal">
          <div className="banner">
            {gameMessage}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
