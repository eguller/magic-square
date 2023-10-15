import {describe, expect, test} from '@jest/globals';
import State from '../../game/State';

describe('State module', () => {
    test('State initializes with 0 values', () => {
      const size = 5;
      const state = State.init(size);
        expect(state.cells.flat().map((cell) => cell.value))
        .toEqual(Array(size * size).fill(0))
    }); 

    test('There should n * n next moves in initial state', () => {
      const size = 5;
      const state = State.init(size);
      const nextMovesSize = state.findNextMoves().length;
      expect(nextMovesSize).toEqual(size * size);
    });

    test('There should be at least 1 solution for 5 * 5 board', () => {
      const size = 4;
      const initialState = State.init(size);
      const solution = initialState.findSolution();
      expect(solution).toBeDefined();
    });
  });