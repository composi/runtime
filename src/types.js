// Dummy export to make this a module with exportable types.
export {}

/**
 * @typedef Tag
 * @prop {string} type
 * @prop {any} [data]
 */

/**
 * @typedef Message
 * @prop {string} type
 * @prop {any} [data]
 * @typedef {(msg?: Message | Function, data?: any) => Message} Send
 * @typedef {() => State} GetState
 */
/**
 * @typedef {any} State Simple or complex types for application state.
 */
/**
 * @typedef {State | void} InitResult Return result of program init method.
 */
/**
 * @typedef Program A program to run.
 * @prop {() => InitResult} init Method to set up initial state.
 * @prop {(state: State, send?: Send) => void} view Method to present the current application state.
 * @prop {(state: State, msg?: Message, send?: Send) => any} update Method to capture messages sent from view or subscriptions. According to the message, an action will transform application state and pass it the the program view method.
 * @prop {(send?: Send, getState?: GetState) => void} [subscriptions] Method to run effects when the program starts. These run independently from the rest of the program.
 * @prop {(send?: Send, getState?: GetState) => void} [subs] Shortcut for subscriptions.
 * @prop {(state: State) => void} [done] Method to do clean up when shutting down a program.
 * @prop {Send} [send] A static send function for dispatching message to a program. Used with routers and in composition.
 */

// export {Message, Send, Program, State, GetState} from "./types"
