export { run } from './runtime'
export { union } from './union'
export { batchEffects, batch } from './effects'

/**
 * Make types available to programs that use them.
 */
/**
 * A program which is executed by the `run` function.
 * @typedef { import('./runtime').Program } Program
 */
/**
 * Message dispatched by the `send` function to the program's `update` method.
 * @typedef { import('./runtime').Message } Message
 */
/**
 * Type of state, which can be of any type.
 * @typedef { import('./runtime').State } State
 */
/**
 * Function for sending messages to the program's `update` method.
 * @typedef { import('./runtime').Send } Send
 */
