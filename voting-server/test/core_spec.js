import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
	describe('setEntries', () => {
		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Jessy Mendiola', 'Arci Munoz');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Jessy Mendiola', 'Arci Munoz')
			}))
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['Jessy Mendiola', 'Arci Munoz'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Jessy Mendiola', 'Arci Munoz')
			}))
		});
	});

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Jessy Mendiola', 'Arci Munoz', 'Angel Locsin')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				entries: List.of('Angel Locsin'),
				vote: Map({
					pair: List.of('Jessy Mendiola', 'Arci Munoz')
				})
			}));
		});

		it('puts winner of current vote back to entries', () => {
			const state = fromJS({
				vote: {
					pair: ['Jessy Mendiola', 'Arci Munoz'],
					tally: {
						'Jessy Mendiola': 4,
						'Arci Munoz': 3
					}
				},
				entries: ['Angel Locsin', 'Jennylyn Mercado', 'Ellen Adarna']
			});
			const nextState = next(state);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['Angel Locsin', 'Jennylyn Mercado'],
				},
				entries: ['Ellen Adarna', 'Jessy Mendiola']
			}));
		});

		it('puts both if tied vote back to entries', () => {
			const state = fromJS({
				vote: {
					pair: ['Jessy Mendiola', 'Arci Munoz'],
					tally: {
						'Jessy Mendiola': 3,
						'Arci Munoz': 3
					}
				},
				entries: ['Angel Locsin', 'Jennylyn Mercado', 'Ellen Adarna']
			});
			const nextState = next(state);

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['Angel Locsin', 'Jennylyn Mercado'],
				},
				entries: ['Ellen Adarna', 'Jessy Mendiola', 'Arci Munoz']
			}));
		});

		it('marks winner when one entry left', () => {
			const state = fromJS({
				vote: {
					pair: ['Jessy Mendiola', 'Arci Munoz'],
					tally: {
						'Jessy Mendiola': 4,
						'Arci Munoz': 3
					}
				},
				entries: []
			});
			const nextState = next(state);

			expect(nextState).to.equal(fromJS({
				winner: 'Jessy Mendiola'
			}));			
		});
	});

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = fromJS({
				pair: ['Jessy Mendiola', 'Arci Munoz']
			});
			const nextState = vote(state, 'Jessy Mendiola');

			expect(nextState).to.equal(fromJS({
				pair: ['Jessy Mendiola', 'Arci Munoz'],
				tally: {
					'Jessy Mendiola': 1
				}
			}));
		});

		it('adds to the existing tally for the voted entry', () => {
			const state = fromJS({
				pair: ['Jessy Mendiola', 'Arci Munoz'],
				tally: {
					'Jessy Mendiola': 1
				}
			});
			const nextState = vote(state, 'Arci Munoz');

			expect(nextState).to.equal(fromJS({
				pair: ['Jessy Mendiola', 'Arci Munoz'],
				tally: {
					'Jessy Mendiola': 1,
					'Arci Munoz': 1
				}
			}));
		});
	});
});