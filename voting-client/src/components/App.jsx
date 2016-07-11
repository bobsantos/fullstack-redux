import React from 'react';
import {List} from 'immutable';

const pair = List.of('Jessy Mendiola', 'Arci Munoz');

export default React.createClass({
	render: function() {
		return React.cloneElement(this.props.children, {pair: pair});
	}
});