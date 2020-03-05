import initialState from '../initialState';
import { play } from '../../helpers';

const initial = initialState.gameState;

const gameStateReducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'PLAY':
      return play({ ...payload, gameState: JSON.parse(JSON.stringify(state)) }) // CLONE DEEP!
    case 'RESET':
      return initial;
    default:
      return state;
  }
};

export default gameStateReducer;
