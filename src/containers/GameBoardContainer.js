import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import GameBoard from '../components/GameBoard/GameBoard';
import { getGameState } from '../store/selectors';

const GameBoardContainer = ({ gameState, actions }) => (
  <GameBoard gameState={gameState} actions={actions} />
);

const mapStateToProps = createStructuredSelector({
  gameState: getGameState,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    play: (payload) => ({ type: 'PLAY', payload }),
    getCurrentPlayer: () => ({ type: 'GET_CURRENT_PLAYER' }),
    reset: () => ({ type: 'RESET' }),
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer);
