# Composi

![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)
![npm (scoped)](https://img.shields.io/npm/v/@composi/core.svg)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

 1. [Introduction](#Introduction)
 2. [Installation](#Installation)
 3. [run](#run)
 4. [union](#union)
 5. [batchEffects](#batchEffects)
 6. [CDN](#CDN)
 7. [Summary](#Summary)

## Introduction

@composi/runtime is a library that provides state management for ui libraries with a render function. It is based on the principles of the Elm Architecture. Some terminology is different because @composi/runtime is targetting front end development in JavaScript.

@composi/runtime is small, barely 600 bytes gzipped. It therefore loads fast and doesn't add much to the overall JavaScript payload of your app.

## Installation

To add Composi core to your project, install from NPM:

```sh
npm i -D @composi/runtime
```

After installing, you can import the `run`, `union` and `batchEffects` functions to create programs that provide advanced state management for you project.

## Run

@composi/core run creates a runtime for Redux-style state management for functional components. To use it, you do need to import it:

```javascript
import { run } from '@composi/core'
```

Run takes one argument, the program to run. This is where it gets interesting. A program has five methods. The first three are required, the last two are optional:

1. init
2. update
3. view
4. subscriptions - optional
5. done - optional

Init is a function that returns the program's state and optionally an effect to run at startup. That's why its called init.

Update is like a Redux reducer. It executes various actions conditionally. The can modify and return the programs state. When it returns the state, it gets passed to the view.

View is a function that can return some kind of presentation of the state. This is where you would use render to output a functional component.

With `init`, `view` and `update` you have everything you need to make a valid program that you can run:


```javascript
import { run } from '@composi/core'
// Minimal valid program to run:
const program = {
  init() {},
  update() {},
  view() {}
}
run(program)
```
## Subsciptions

Subscriptions is an optional method that contains effects to run when the program starts. Using @composi/core's `batchEffects` function it is possible to run more than one effect at the same time, say, start a timer and fetch data at the same time. Subscriptions is optional. In fact, it's just a more convenient and explicit way of running an effect the same way passing an effect as the second value in `init` is. Many people will feel more comfortable using a dedicated function for subscriptions that simply tagging on an extra value to `init`.

Done is an optional method that allows you to do clean when you stop a program, such as stopping timers, animations, etc. When you pass a program to `run`, it returns a function that you can use to stop a program. The following is a simple program that does only one thing--it starts a setInterval. At any time we can stop the program and terminate the interval. Notice how we use `done` to do this.


```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { run } from '@composi/core'

const section = document.querySelector('#clock')


// Define clock component for view:
function Clock(state) {
  return (
    <div id="clock">
      <h2>The time is {state}</h2>
    </div>
  )
}

// Define effect to run at program start.
// It will start a loop that runs every second,
// sending a message to the update function.
// Put it after state in init:
let setIntervalID
function startLoop(getState, send) {
  let count = 0
  setIntervalID = setInterval(() => {
    console.log(count++)
    send('update-time')
  }, 1000)
}

// Define funtion to stop setInterval:
function stopLoop() {
  clearInterval(setIntervalID)
}

function action(state, msg) {
  if (msg === 'update-time') {
    state = new Date().toLocaleTimeString()
    // Return new state to re-render view:
    return state
  }
}

// Assemble program:
const program = {
  init() {
    return new Date().toLocaleTimeString()
  },
  view(state) {
    return ReactDOM.render(Clock(state), '#clock')
  },
  update(state, msg, send) {
    return action(state, msg)
  },
  // Setup subscription:
  subscriptions(getState, send) {
    return startLoop(getState, send)
  },
  // ADD DONE METHOD FOR EFFECT CLEANUP:
  done() {
    stopLoop()
  }
}

// Run program.
// While doing so, capture program in stopProgram variable,
// so we can stop it.
const stopProgram = run(program)
```


### Each program method expects certain arguments.

Init is a function that returns an array. The first entry in that array is the state for the program. The second entry, which is optional, is an effect to run at startup. This might be a setInterval timer, or a code to fetch data.

Update get two arguments: message and state. Message is any message sent to it by the view. Message get sent when events are triggered in the UI, possibly by the user.

View gets passed two arguments: state and send. The state is used by the view's template function to render. The send function is used to send messages from the view to the update method. You let the update method know what action occured and any data that the action might need.

Here's an simple clicker example:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { run } from '@composi/core'
const section = document.querySelector('section')

// Counter for view:
function Counter({state, send}) {
  return (
    <p>
      <button class='counter' onclick={() => send()}>{state}</button>
    </p>
  )
}

// Assemble program:
const program = {
  // Set initial state:
  init() {
    return 0
  },
  update(state, msg) {
    return state + 1
  },
  view(state, send) {
    return ReactDOM.render(<Counter {...{state, send}} />, '#counter')
  }
}

// Run program:
run(program)
```

[Live example on Codepen](https://codepen.io/rbiggs/pen/EOYOEJ)

The above example was very simplistic, but it shows how to send a message from the view to the update method. Although we sent a message, it was not of any value, so it was undefined. If your program is very simple and only has one action like this, then you can just send an empty message. However, if your program needs more than one action/message, you'll need to use a standard interface for the messages you send. In the following Todo list example we implement several actions for the update method by sending message objects that we can test to see which one was received:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { run } from '@composi/core'

const section = document.querySelector('section')

// State for program:
const state = {
  newKey: 104,
  inputVal: '',
  fruits: [
    {
      key: 101,
      value: 'Apples'
    },
    {
      key: 102,
      value: 'Oranges'
    },
    {
      key: 103,
      value: 'Bananas'
    }
  ]
}

// Actions for Update:
function actions(state, msg) {
  switch (msg.type) {
    case 'add-item':
      const value = msg.inputValue
      if (value) {
        state.fruits.push({ key: state.newKey++, value })
        return [state]
      } else {
        alert('Please provide a value!')
        return [state]
      }
      break
    case 'delete-item':
      state.fruits = state.fruits.filter(item => item.key != msg.key)
      return [state]
      break
  }
}

// Functional list component for view:
function List({state, send}) {
  let inputValue
  const focusInput = input => {
    input.focus()
  }
  const getInputValue = e => (inputValue = e.target.value)
  return (
    <div class='list-container'>
      <p class='list-form'>
        <input value={state.inputVal} onupdate={focusInput} onchange={getInputValue} type="text"/>
        <button class='add-item' onclick={() => send({type: 'add-item', inputValue})}>Add</button>
      </p>
      <ul>
        {
          state.fruits.map(item => (
            <li key={item.key}>
              <span>{item.value}</span>
              <button class="delete-item" onclick={() => send({
                type: 'delete-item',
                key: item.key
              })}>X</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// Assemble program together:
const program = {
  init() {
    return [state]
  },
  update(state, msg) {
    return actions(state, msg)
  },
  view(state, send) {
    return ReactDOM.render(<List {...{state, send}} />, '#todo-list')
  }
}

// Run program:
run(program)
```

[Live example on Codepen](https://codepen.io/rbiggs/pen/gBZEQp?editors=1010)

In the above example, we now have a dedicated actions function that handles different possible updates: add-item, delete-item. Notice that an action always returns state:
```javascript
return [state]
```
If an action fails to return state, the program will throw an exception and the view will fail to render. Even if you make no changes to state, you have to return it.

The program's view method gets two arguments, the state and the send function. This is used interally by the runtime. You use it in the view to send messages to the update method. These messages can be objects with a type and data for the action to use.

Although this is manageable, we can make this actions and events more implicit by using tagged unions. This is explained next.

## Union

@composi/core's union function lets you create tagged unions. Basically, a tagged union allows you to associate one value, usually a string, with another value. For actions and events this will be the action function to run.

The union function takes a variable number of arguments, separated by commas. This returns a tagged union object. It has a method called `match` that allows you to check what union you are dealing with a run a function.

Here's the previous todo list redone using tagged unions. Notice that in the view, when we send, we send a tagged union function. This makes it clearer what the event is doing. When we invoke a tagged union function inside an event's send method, it actually sends a packet with a type and data to the update function. So tagged unions are doing the same as we did in the first example of the todo list, but the show what is being invoked inside the update function.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { run } from '@composi/core'

const section = document.querySelector('section')

// The State.
// An object defining the state for the app.
const state = {
  newKey: 104,
  inputValue: '',
  fruits: [
    {
      key: 101,
      value: 'Apples'
    },
    {
      key: 102,
      value: 'Oranges'
    },
    {
      key: 103,
      value: 'Bananas'
    }
  ]
}

// Tagged union for actions,
// This will match string values to functions.
// Capture the union in the Msg object.
const Msg = union('updateInputValue', 'addItem', 'deleteItem')

// Desturcture tagged union variables:
const {updateInputValue, addItem, deleteItem} = Msg


// Business Logic.
// Intercept actions dispatched by view.
// Use those actions to transform state.
// Then return the new state.
// That will cause the view to update.
function actions(state, msg, send) {
  return Msg.match(msg, {
    updateInputValue: value => {
      state.inputValue = value
      return [state]
    }
    addItem: () => {
      if (state.inputValue) {
        state.fruits.push({ key: state.newKey++, value: state.inputValue })
        return [state]
      } else {
        alert('Please provide a value!')
      }
    },
    deleteItem: key => {
      state.fruits = state.fruits.filter(item => item.key != key)
      return [state]
    }
  })
}

// The view: a list component.
// I knows nothing about state or update.
// It catches user interactions and
// dispatches the results.
// It also uses lifecycle events to handle
// visual effects, such as input focus.
function List({state, send}) {
  let inputValue
  const focusInput = input => {
    input.focus()
  }
  return (
    <div class='list-container'>
      <p class='list-form'>
        <input
          value={state.inputValue}
          onupdate={focusInput}
          oninput={e => send(updateInputValue(e.target.value))} type="text"
        />
        <button class='add-item' onclick={() => send(addItem())}>Add</button>
      </p>
      <ul>
        {
          state.fruits.map(item => (
            <li key={item.key}>
              <span>{item.value}</span>
              <button
                class="deleteItem"
                onclick={() => send(deleteItem(item.key))}
              >X</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// Assemble program to run:
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return ReactDOM.render(<List state={...{state, send}} />, '#todo-list')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  }
}

// Run program:
run(program)
```
[Live example on Codepen](https://codepen.io/rbiggs/pen/zMOmON)

As you can see in the above example, tagged unions make the connection between view events and update actions more implicit.

## batchEffects

Sometimes you may need to run several effects at the same time. @composi/runtime provides a way to do this with the function `batchEffects`. To use it, define each effect separated, then provide them to `batchEffects` as arguments. Below we show how to do this with subscriptions:

```javascript
// effects/subscriptions.js
import {batchEffects} from '@composi/core'
import { addItem, useFetchedData } from '../effects/messages'

// First effect.
function handleEnterKey(getState, send) {
  document.addEventListener('keypress', e => {
    if (e.keyCode === 13) send(addItem())
  })
}
// Second effect.
function getData(getState, send) {
  (async () => {
    const response = await fetch('/src/js/data/state.json')
    /** @type {State} */
    const data = await response.json()
    send(useFetchedData(data))
  })()
}

// Combine both effects with batchEffects:
export const subs = batchEffects(handleEnterKey, getData)
```

Now we can just import `subs`, which is the two effects batched together:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { run, union, batchEffects } from '@composi/core'
import {TodoList} from './components/todo-list'
import {actions} from './effects/actions'
import {subs} from './effects/subscriptions'

const program = {
  init() {
    return null
  },
  view(state, send) {
    return state && render(<TodoList {...{state, send}}/>, '#app')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  subscriptions(getState, send) {
    // Use the batched effects here:
    return subs(getState, send)
  }
}

run(program)
```

## CDN

@composi/runtime does not require a build process. You can load it in modern browsers using ES6 module imports. In the following example we do with with Lit-HTML and @composi/runtime. Note, we only implement state and view in the program, no actions, so save some space. This just shows how to load @composi/runtime with Lit-HTML in the browser as ES6 moduels without the need to compile or build:

```html
<body>
  <script type="module">
    import { html, render } from 'https://unpkg.com/lit-html@1.1.2/lit-html.js?module'
    import { run } from './node_modules/@composi/runtime/dist/runtime.mjs?module'

      const state = {
        newKey: 104,
        inputValue: '',
        items: [
          {
             key: 101,
             value: 'Apple'
          },
          {
             key: 102,
             value: 'Orange'
          },
          {
             key: 103,
             value: 'Banana'
          }
        ]
      }
      const TodoList = ({ state, send }) => html`
        <div>
          <p class="form">
            <input .value="${state.inputValue}" type="text"/>
            <button class='add-item'>Add</button>
          </p>
          <ul>
            ${
          state.items.map(item => {
            const classObj = {
              "new-item": true,
              "remove-item": item.deletable
            }
            return html`
                <li key=${item.key} class='new-item'>
                  <span>${item.value}</span>
                  <button class='delete-item'>X</button>
                </li>
              `
          })
          }
          </ul>
        </div>
      `
    const program = {
      init() {
        return state
      },
      view(state, send) {
        return render(TodoList({ state, send }), document.body)
      },
      update(state, msg, send) {

      }
    }
    run(program)
  </script>
</body>
```

## Summary

@composi/runtime with really just the runtime environment from @composi/core minus the virtual DOM, etc. As such the core test are actually done on the @compsi/core repository. @composi/runtime exists to make it easier to use the state management features of the @composi/core runtime environment with other render libraries. This is possible because the `view` of a @composi/runtime program is agnostic about how you render the state. If a library has a function that can take a state argument and output the result to the DOM, it can be used with @composi/runtime. In the examples above we were using React. You could use Preact, Inferno, Lit-Html, etc.
