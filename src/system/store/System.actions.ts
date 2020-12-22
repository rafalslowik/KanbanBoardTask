import { KeyValue } from "../types/KeyValue"

/**
 * Action can exists only in 2 shapes. `Pure type` or `type with payload`
 */
export type Action<T extends string = string, P = void> = P extends void
	? Readonly<{ type: T }>
	: Readonly<{ type: T; payload: P }>

/**
 * Flux pure action creator
 * @param type Action type
 */
export function createAction<T extends string>(type: T): Action<T>;

/**
 * Flux action with payload creator
 * @param type Action type
 * @param payload Action payload model
 */
export function createAction<T extends string, P>(type: T, payload: P): Action<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
	return payload === undefined ? { type } : { type, payload };
}

/**
 * Union all action typeof A
 */
export type ActionsUnion<A extends KeyValue<AnyFunction>> = ReturnType<
	A[keyof A]
>;

/**
* Use AnyFunction type definition instead of `Function` type constructor
*/
export type AnyFunction = (...args: any[]) => any;

