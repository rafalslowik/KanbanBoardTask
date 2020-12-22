import { ActionsUnion, createAction } from "../store/System.actions";

/** Save to local storage action type */
export const SAVE_TO_LOCAL_STORAGE = "LOCAL_STORAGE::SAVE"
/** Save to local storage success action type */
export const SAVE_TO_LOCAL_STORAGE_SUCCESS = "LOCAL_STORAGE::SAVE_SUCCESS"
/** Save to local storage error action type */
export const SAVE_TO_LOCAL_STORAGE_ERROR = "LOCAL_STORAGE::ERROR"

/**
 * Local storage actions
 */
export const Actions = {
	saveToLocalStorage: () => createAction(SAVE_TO_LOCAL_STORAGE),
	saveToLocalStorageSuccess: () => createAction(SAVE_TO_LOCAL_STORAGE_SUCCESS),
	saveToLocalStorageError: () => createAction(SAVE_TO_LOCAL_STORAGE_ERROR)
}

/**
 * Local storage merged actions in one types
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Actions = ActionsUnion<typeof Actions>;
