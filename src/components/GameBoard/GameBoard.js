import React from 'react';
import { getCurrentPlayer, hasWinner, scratch } from '../../helpers';
import styles from './GameBoard.module.css';

const GameBoard = ({ gameState, actions }) => {
  const player = getCurrentPlayer(gameState);
  const gameOver = hasWinner(gameState);
  const isDraw = scratch(gameState);
  return (
    <div className={styles['container']}>
      <div className={styles['game-stats']}>
        <h1>Connect Four</h1>
        {!gameOver && !isDraw && <p className={styles['player']}>{player === 'r' ? 'Red' : 'Yellow'}'s Turn</p>}
        {gameOver && <p className={styles['player']}>{player === 'y' ? 'Red' : 'Yellow'} Wins!</p>}
        {isDraw && <p className={styles['player']}>You both win!</p>}
      </div>
      <div className={styles['buttons']}>
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 0, player })} />
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 1, player })} />
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 2, player })} />
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 3, player })} />
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 4, player })} />
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 5, player })} />
        <button disabled={gameOver} className={[styles['button'], styles[`${player}-btn`]].join(' ')} onClick={() => actions.play({ column: 6, player })} />
      </div>
      <div className={styles['game-board']}>
        {gameState.map((row, i) => (
          <div key={i} className={styles['row']}>
            {row.map((pos, i) => (
              <div key={`${i}${pos}`} className={styles[pos ? pos : 'empty']} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles['game-stats']}>
        {(gameOver || isDraw) && <button className={styles['reset']}onClick={actions.reset}>Start New Game</button>}
      </div>
    </div>
  );
}

export default GameBoard;