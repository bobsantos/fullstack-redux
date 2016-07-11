import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';

import Voting from '../../src/components/Voting';

describe('Voting', () => {
	it('renders a pair buttons', () => {
		const component = renderIntoDocument(<Voting pair={["Jessy Mendiola", "Arci Munoz"]} />);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Jessy Mendiola');
		expect(buttons[1].textContent).to.equal('Arci Munoz');
	});

	it('invokes a callback when a button is clicked', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;
		const component = renderIntoDocument(<Voting pair={["Jessy Mendiola", "Arci Munoz"]} vote={vote} />);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[0]);

		expect(votedWith).to.equal('Jessy Mendiola');
	});

	it('disables buttons when user has voted', () => {
		const component = renderIntoDocument(<Voting pair={["Jessy Mendiola", "Arci Munoz"]} hasVoted="Jessy Mendiola" />);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to the voted entry', () => {
		const component = renderIntoDocument(<Voting pair={["Jessy Mendiola", "Arci Munoz"]} hasVoted="Jessy Mendiola" />);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders just the winner when there is one', () => {
		const component = renderIntoDocument(<Voting pair={["Jessy Mendiola", "Arci Munoz"]} winner="Jessy Mendiola" />);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Jessy Mendiola');
	});
});