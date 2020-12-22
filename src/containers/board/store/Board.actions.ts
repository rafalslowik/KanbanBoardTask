
import { ActionsUnion, createAction } from "../../../system/store/System.actions";
import { TaskBase } from "../models/Task";
import { SetTaskOrderPayload, SetTaskStatusPayload } from "./Board.types";


/** Set form visibility action type */
export const SET_FORM_VISIBILITY = "BOARD::SET_FORM_VISIBILITY"
/** Add task action type */
export const ADD_TASK = "BOARD::ADD_TASK"
/** Delete task action type */
export const DELETE_TASK = "BOARD::DELETE_TASK"
/** Increase id sequencer action type */
export const INCREASE_ID_SEQUENCER = "BOARD::INCREASE_ID_SEQUENCER"
/** Set task order action type */
export const SET_TASK_ORDER = "BOARD::SET_TASK_ORDER"
/** Set task status action type */
export const SET_TASK_STATUS = "BOARD::SET_TASK_STATUS"


/**
 * Board actions
 */
export const Actions = {
	setFormVisibility: (visible: boolean) => createAction(SET_FORM_VISIBILITY, visible),
	addTask: (task: TaskBase) => createAction(ADD_TASK, task),
	deleteTask: (id: string) => createAction(DELETE_TASK, id),
	increaseIdSequencer: () => createAction(INCREASE_ID_SEQUENCER),
	setTaskOrder: (payload: SetTaskOrderPayload) => createAction(SET_TASK_ORDER, payload),
	setTaskStatus: (payload: SetTaskStatusPayload) => createAction(SET_TASK_STATUS, payload)
}

/**
 * Board merged actions in one types
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Actions = ActionsUnion<typeof Actions>;
