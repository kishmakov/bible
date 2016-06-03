import { createStore } from 'redux'

const INITIAL_STATE = {
};

function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TOGGLE':
            if (!state[action.verseId]) {
                state[action.verseId] = {
                    info: null,
                    open: false
                };
            }
            state[action.verseId].open = !state[action.verseId].open;
            document.getElementById(action.verseId).className = state[action.verseId].open
                ? "specified-verse"
                : "specifiable-verse";

            return { ...state };
        default:
         return state
    }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

// You can use subscribe() to update the UI in response to state changes.
// Normally you’d use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
console.log(JSON.stringify(store.getState()))
)

_global.store = store;
