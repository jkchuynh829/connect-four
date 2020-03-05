import _ from 'lodash';

/**
 * Count how many pieces a player has on the board
 * @param {*} gameState 
 * @param {*} player 
 */
export const countPlays = (gameState, player) =>
  gameState.reduce((count, row) =>
    count + row.filter((play) => play === player).length, 0);

/**
 * Compares number of respective pieces on the board
 * @param {*} gameState 
 */
export const validatePlays = (gameState) => {
  const redPlays = countPlays(gameState, 'r');
  const yellowPlays = countPlays(gameState, 'y');

  if (redPlays - yellowPlays < 0) { // yellow is out of turn
    return false;
  }

  if (redPlays - yellowPlays > 1) { // red is too many turns ahead
    return false;
  }

  return true;
}

/**
 * Determines current player turn based on play count (assuming red is first)
 * @param {arr} gameState
 * @return {string} should be 'r' or 'y'
 */
export const getCurrentPlayer = (gameState) => {
  const redPlays = countPlays(gameState, 'r');
  const yellowPlays = countPlays(gameState, 'y');
  if (redPlays === yellowPlays) return 'r';
  return 'y';
};

/**
 * Determines valid game state based on play counts
 * and position of pieces on the board (no floating pieces)
 * @param {arr} gameState
 * @return {bool}
 */
export const isValidState = (gameState) => {
  if (!validatePlays(gameState)) return false;

  return gameState.reduce((isValid, row, rowIndex, gameState) => {
    if (!isValid) return false;
    return row.reduce((acc, curr, i, a) => {
      if (!acc) return false;
      if (rowIndex === gameState.length - 1) return true;
      if (curr && !gameState[rowIndex + 1][i]) return false;
      return true;
    }, true)
  }, true);;
};

/**
 * Determines four in a row horizontally
 * @param {array} gameState 
 * @return {bool}
 */
export const checkWinHorizontal = (gameState) => {
  const highestConsecutive = gameState.map((row) => {
    return row.reduce((acc, curr, i, a) => {
      if (acc >= 4) return acc;
      if (!curr) return 0;
      if (i === 0) return 1;
      return curr === a[i - 1] ? acc + 1 : 1;
    }, 0);
  });

  return Math.max(...highestConsecutive) >= 4;
}

/**
 * Checks for four in a row diagonally (down/right)
 * @param {array} gameState 
 */
export const checkWinDiagnolDownRight = (gameState) => {
  return gameState.reduce((outerBool, row, rowIndex, outerArr) => {
    if (outerBool) return outerBool; // Only requires one instance of a win condition
    return row.reduce((innerBool, col, colIndex) => {
      if (innerBool) return innerBool; // Only requires one instance of a win condition
      if (!col || rowIndex > 2 || colIndex > 3) return false; // Add constraints to row and columns where a win condition can exist
      if (
        col === outerArr[rowIndex + 1][colIndex + 1] // Compare value that is in the next row to the right
        && col === outerArr[rowIndex + 2][colIndex + 2]
        && col === outerArr[rowIndex + 3][colIndex + 3]
      ) return true;
      return innerBool;
    }, false);
  }, false);
}

/**
 * Checks for four in a row diagonally (up/right)
 * @param {array} gameState 
 */
export const checkWinDiagnolUpRight = (gameState) => {
  return gameState.reduce((outerBool, row, rowIndex, outerArr) => {
    if (outerBool) return outerBool; // Only requires one instance of a win condition
    return row.reduce((innerBool, col, colIndex) => {
      if (innerBool) return innerBool; // Only requires one instance of a win condition
      if (!col || rowIndex < 3 || colIndex > 3) return false;
      if (
        col === outerArr[rowIndex - 1][colIndex + 1] // Compare value that is in the next row to the right
        && col === outerArr[rowIndex - 2][colIndex + 2]
        && col === outerArr[rowIndex - 3][colIndex + 3]
      ) return true;
      return innerBool;
    }, false);
  }, false);
}

/**
 * Checks for four in a row horizontally, verticaly and in diagnols
 * @param {array} gameState 
 */
export const hasWinner = (gameState) => {
  const transposedGameState = _.zip(...gameState);
  return checkWinHorizontal(gameState)
    || checkWinHorizontal(transposedGameState)
    || checkWinDiagnolDownRight(gameState)
    || checkWinDiagnolUpRight(gameState);
};

/**
 * Logic for updating rows
 * @param {array} curr 
 * @param {array} next 
 * @param {number} col 
 * @param {string} player 
 */
const updateRow = (curr, next, col, player) => {
  if (!next && curr[col]) return curr; // if last row and already played

  // Update if...
  if (
    (!next && !curr[col]) // is last row and position is open
    || (next[col] && !curr[col]) // position is open and below is played
  ) {
    curr[col] = player;
    return curr;
  }

  return curr;
};

/**
 * Return updated game state
 * @param {object} action
 * @param {array} action.gameState 
 * @param {string} action.player
 * @param {number} action.column
 */
export const play = ({ gameState, player, column }) => {
  const newState = gameState.map((row, i, arr) =>
    updateRow(row, arr[i + 1], column, player));
  return isValidState(newState) ? newState : gameState;
};

/**
 * 
 */
export const scratch = (gameState) => {
  const flattenedArray = gameState.flat();
  const playCount = flattenedArray.filter((play) => !!play).length;
  const valid = isValidState(gameState);
  return valid && playCount >= 42 && !hasWinner(gameState);
}