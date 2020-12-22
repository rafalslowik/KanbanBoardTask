import { combineReducers } from "redux";
import { boardReducer } from "../../containers/board/store/Board.reducer";
import { BoardReduxStore } from "../../containers/board/store/Board.state";
import { loadBoardState } from "../localStorage/LocalStorage";


/**
 * Redux store model
 */
export type ReduxStore = BoardReduxStore;

/**
 *  Root reducer
 */
export const rootReducer = combineReducers<ReduxStore>({
	board: boardReducer
});

/**
 * Preloaded state
 */
export const preloadedState: ReduxStore = {
	board: loadBoardState()
}
