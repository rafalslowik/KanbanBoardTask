import { Epic, ofType } from "redux-observable";
import { map, mergeMap } from "rxjs/operators";
import * as fromActions from "./Board.actions";
import * as fromLocalStorageActions from "../../../system/localStorage/LocalStorage.actions";

/**
 * Add epic
 */
const addEpic: Epic<fromActions.Actions> = (action$) =>
	action$.pipe(
		ofType(fromActions.ADD_TASK),
		mergeMap(() => {
			return [
				fromActions.Actions.increaseIdSequencer(),
				fromActions.Actions.setFormVisibility(false),
			]
		})
	)

/**
 * Refresh local storage epic
 */
const refreshLocalStorageEpic: Epic<fromActions.Actions | fromLocalStorageActions.Actions, fromLocalStorageActions.Actions> = (action$, state$) =>
	action$.pipe(
		ofType(
			/** Save board store to local storage after this actions  */
			fromActions.INCREASE_ID_SEQUENCER,
			fromActions.DELETE_TASK,
			fromActions.SET_TASK_ORDER,
			fromActions.SET_TASK_STATUS
		),
		map(() => fromLocalStorageActions.Actions.saveToLocalStorage())
	)


export const boardEpics: Epic[] = [
	addEpic,
	refreshLocalStorageEpic
]
