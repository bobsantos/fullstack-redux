import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Jessy Mendiola', 'Arci Munoz'];

ReactDOM.render(
	<Voting pair={pair} winner="Jessy Mendiola" />,
	document.getElementById('app')
);