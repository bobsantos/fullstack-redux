import makeStore from './store';
import startServer from './server';

export const store = makeStore();
startServer(store);

store.dispatch({
	type: 'SET_ENTRIES',
	entries: require('./data/entries.json')
});

store.dispatch({type: 'NEXT'});