
import { KeyValue } from "../../../system/types/KeyValue"
import { Status } from "../models/Status"
import { Task } from "../models/Task"


/**
 * Board redux store model
 */
export type BoardReduxStore = {
	/** Board state */
	board: BoardState;
}

/**
 * Technical fields
 */
export type TechFields = {
	/** Task id sequencer */
	idSequencer: number;
	/** Task order */
	taskOrder: KeyValue<string[], Status>;
	/** Is adding active */
	adding: boolean;
}

/**
 * Board state model
 */
export type BoardState = {
	/** Technical fields */
	techFields: TechFields
	/** Task list */
	task: KeyValue<Task>;
}

/**
 * Initial board state
 */
export const initState: BoardState = {
	techFields: {
		idSequencer: 1,
		taskOrder: {
			Todo: [],
			Completed: [],
			InProgress: []
		},
		adding: false
	},
	task: {}
}
