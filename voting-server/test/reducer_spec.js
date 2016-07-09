import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {
	it('has an initial state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Jessy Mendiola']};
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Jessy Mendiola']
		}));
	});

	it('handles SET_ENTRIES', () => {
		const state = Map();
		const action = {type: 'SET_ENTRIES', entries: ['Jessy Mendiola']};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Jessy Mendiola']
		}));
	});

	it('handles NEXT', () => {
		const state = fromJS({
			entries: ['Jessy Mendiola', 'Arci Munoz']
		});
		const action = {type: 'NEXT'};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			entries: [],
			vote: {
				pair: ['Jessy Mendiola', 'Arci Munoz']
			}
		})); 
	});

	it('handles VOTE', () => {
		const state = fromJS({
			entries: [],
			vote: {
				pair: ['Jessy Mendiola', 'Arci Munoz']
			}
		});
		const action = {type: 'VOTE', entry: 'Jessy Mendiola'};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			entries: [],
			vote: {
				pair: ['Jessy Mendiola', 'Arci Munoz'],
				tally: {
					'Jessy Mendiola': 1
				}
			}
		})); 
	});

	it('can be used with a reduce', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Jessy Mendiola', 'Arci Munoz']},
			{type: 'NEXT'},
			{type: 'VOTE', entry: 'Jessy Mendiola'},
			{type: 'VOTE', entry: 'Arci Munoz'},
			{type: 'VOTE', entry: 'Jessy Mendiola'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			winner: 'Jessy Mendiola'
		}));
	});
});