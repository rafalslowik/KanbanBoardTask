import { Status } from "../models/Status";

/**
 * Set task order payload model
 */
export type SetTaskOrderPayload = {
	/** Task source order */
	sourceIndex: number;
	/** Task source order */
	destinationIndex: number;
	/** Task id */
	taskId: string;
}

/**
 * Set task status payload model
 */
export type SetTaskStatusPayload = {
	/** Task source order */
	sourceIndex: number;
	/** Task source order */
	destinationIndex: number;
	/** Task id */
	taskId: string;
	/** New task status */
	newStatus: Status;
}
