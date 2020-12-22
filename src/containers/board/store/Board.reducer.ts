import { Reducer } from "redux";
import produce from "immer";
import { BoardState, initState } from "./Board.state";
import * as fromActions from "./Board.actions";


/**
 * Board reducer
 */
const reducer: Reducer<BoardState> = (state: BoardState = initState, action: fromActions.Actions) => {
	return produce<BoardState>(state, draft => {
		switch (action.type) {
			case fromActions.SET_FORM_VISIBILITY: {
				draft.techFields.adding = action.payload;
				break;
			}
			case fromActions.INCREASE_ID_SEQUENCER: {
				draft.techFields.idSequencer = state.techFields.idSequencer + 1;
				break;
			}
			case fromActions.ADD_TASK: {
				const id: string = "task" + state.techFields.idSequencer;
				const { title, description } = action.payload;
				draft.task[id] = {
					id,
					description,
					title,
					status: "Todo",
				};
				draft.techFields.taskOrder.Todo.push(id);
				break;
			}
			case fromActions.SET_TASK_ORDER: {
				const { taskId, destinationIndex, sourceIndex } = action.payload;
				const { status } = state.task[taskId];
				const [moveItem] = draft.techFields.taskOrder[status].splice(sourceIndex, 1);
				draft.techFields.taskOrder[status].splice(destinationIndex, 0, moveItem);
				break;
			}
			case fromActions.SET_TASK_STATUS: {
				const { taskId, destinationIndex, sourceIndex, newStatus } = action.payload;
				const { status: oldStatus } = state.task[taskId];
				draft.task[taskId].status = newStatus;
				const [moveItem] = draft.techFields.taskOrder[oldStatus].splice(sourceIndex, 1)
				draft.techFields.taskOrder[newStatus].splice(destinationIndex, 0, moveItem);
				break;
			}
			case fromActions.DELETE_TASK: {
				const { id, status } = state.task[action.payload];
				delete draft.task[id];
				const index: number = state.techFields.taskOrder[status].indexOf(id)
				draft.techFields.taskOrder[status].splice(index, 1);
				break;
			}
		}
	})
}

export {
	reducer as boardReducer
}
