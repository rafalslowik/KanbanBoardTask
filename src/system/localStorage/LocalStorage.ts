import { BoardState } from "../../containers/board/store/Board.state";

/**
 * Board state key in storage
 */
export const BOARD_STATE_KEY: string = 'board_state';

/**
 * Load board state from storage
 */
export const loadBoardState = (): BoardState => {
	try {
		const serializedState: string = localStorage.getItem(BOARD_STATE_KEY);
		if (serializedState === null) {
			return undefined;
		}
		return (JSON.parse(serializedState) as BoardState);
	} catch (err) {
		return undefined;
	}
};
