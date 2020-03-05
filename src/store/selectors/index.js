import { createSelector } from 'reselect';

export const getTopLevel = (key) => (state) => state[key];

export const gameStateTopLevel = getTopLevel('gameState');

export const getGameState = createSelector(
  gameStateTopLevel,
  (gameState) => gameState,
);
