/**
 * Key value alias to define js typed objects
 */
export type KeyValue<T, TKey extends keyof any = string> = {
	/** String key with value of T type */
	[K in TKey]: T
}

