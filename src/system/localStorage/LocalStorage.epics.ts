import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { ReduxStore } from "../store/System.reducers";
import { BOARD_STATE_KEY } from "./LocalStorage";
import * as fromActions from "./LocalStorage.actions";

/**
 * Save to local storage
 */
const saveStateToLocalStorage = async (state: ReduxStore): Promise<boolean> => {
	try {
		if (state != null && state.board != null) {
			const serializedState: string = JSON.stringify(state.board);
			localStorage.setItem(BOARD_STATE_KEY, serializedState);
			return true;
		}
		return false;
	} catch {
		console.error("Saving to local storage failed.");
		return false;
	}
};

/**
 * Save to local storage epic
 */
const saveToLocalStorageEpic: Epic<fromActions.Actions> = (action$, state$) =>
	action$.pipe(
		ofType(fromActions.SAVE_TO_LOCAL_STORAGE),
		switchMap(async () => {
			const success: boolean = await saveStateToLocalStorage(state$.value);

			if (success === true) {
				return fromActions.Actions.saveToLocalStorageSuccess();
			}
			return fromActions.Actions.saveToLocalStorageError();
		})
	)

export const localStorageEpics: Epic[] = [
	saveToLocalStorageEpic
]
