import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
	describe('a number', () => {
		function increment(currentState) {
			return currentState + 1;
		}

		it('is immutable', () => {
			let state = 42;
			let nextState = increment(state);

			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});
	});

	describe('a List', () => {
		function addArtist(currentState, artist) {
			return currentState.push(artist);
		}

		it('is immutable', () => {
			let state = List.of('Jessy Mendiola', 'Arci Munoz');
			let nextState = addArtist(state, 'Angel Locsin');

			expect(nextState).to.equal(List.of(
				'Jessy Mendiola',
				'Arci Munoz',
				'Angel Locsin'));
			expect(state).to.equal(List.of(
				'Jessy Mendiola',
				'Arci Munoz'));
		});
	});

	describe('a tree', () => {
		function addArtist(currentState, artist) {
			return currentState.update('artists', artists => artists.push(artist));
		}

		it('is immutable', () => {
			let state = Map({
				artists: List.of('Jessy Mendiola', 'Arci Munoz')
			});
			let nextState = addArtist(state, 'Angel Locsin');

			expect(nextState).to.equal(Map({
				artists: List.of('Jessy Mendiola', 'Arci Munoz', 'Angel Locsin')
			}));
			expect(state).to.equal(Map({
				artists: List.of('Jessy Mendiola', 'Arci Munoz')
			}));
		});
	});
});