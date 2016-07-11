import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {expect} from 'chai';

import Results from '../../src/components/Results';

describe('Results', () => {
	it('renders entries with zero', () => {
		const pair = List.of('Jessy Mendiola', 'Arci Munoz');
		const tally =  Map();
		const component = renderIntoDocument(<Results pair={pair} tally={tally} />);
		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [jessy, arci] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(jessy).to.contain('Jessy Mendiola');
		expect(jessy).to.contain('0');
		expect(arci).to.contain('Arci Munoz');
		expect(arci).to.contain('0');
	});

	it('renders entries with vote counts or zero', () => {
		const pair = List.of('Jessy Mendiola', 'Arci Munoz');
		const tally =  Map({'Jessy Mendiola': 5, 'Arci Munoz': 1});
		const component = renderIntoDocument(<Results pair={pair} tally={tally} />);
		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [jessy, arci] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(jessy).to.contain('Jessy Mendiola');
		expect(jessy).to.contain('5');
		expect(arci).to.contain('Arci Munoz');
		expect(arci).to.contain('1');
	});

	it('invokes the next callback when the next button is clicked', () => {
		let nextInvoked = false;
		const next = () => nextInvoked = true;
		const pair = List.of('Jessy Mendiola', 'Arci Munoz');
		const component = renderIntoDocument(
			<Results pair={pair} tally={Map()} next={next} />
		);

		Simulate.click(ReactDOM.findDOMNode(component.refs.next));

		expect(nextInvoked).to.equal(true);
	});

	it('renders the winner when there is one', () => {
		const pair = List.of('Jessy Mendiola', 'Arci Munoz'); 
		const component = renderIntoDocument(
			<Results winner="Jessy Mendiola" pair={pair} tally={Map()} />
		);
		const winner = ReactDOM.findDOMNode(component.refs.winner);

		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Jessy Mendiola');
	});
});