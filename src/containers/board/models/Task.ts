import { Status } from "./Status";

/**
 * Task base model
 */
export type TaskBase = {
	title: string;
	/** Description */
	description: string;
}

/**
 * Task model
 */
export type Task = {
	/** Task id */
	id: string;
	/** Status */
	status: Status;
} & TaskBase
