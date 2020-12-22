import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from "redux-observable";
import { preloadedState, rootReducer } from './System.reducers';
import { boardEpics } from '../../containers/board/store/Board.epics';
import { localStorageEpics } from '../localStorage/LocalStorage.epics';


/**
 * System global epics
 */
const rootEpic = combineEpics(...boardEpics, ...localStorageEpics);

/**
 * Compose enhancers
 */
const composeEnhancers = composeWithDevTools({
	/** Specify name here, actionsBlacklist, actionsCreators and other options if needed */
});

/**
 * Epic middleware instance
 */
const epicMiddleware = createEpicMiddleware();

/**
 * Configure system store
 */
export function configureStore() {
	/** Create store */
	const store = createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(epicMiddleware)
		),
	);

	/** Run epic middleware  */
	epicMiddleware.run(rootEpic);

	return store;
}
