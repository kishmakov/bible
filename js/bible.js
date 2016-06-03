import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'

function counter(state = {}, action) {
    switch (action.type) {
        case 'TOGGLE':
            if (!state[action.verse]) {
                state[action.verse] = {
                    info: undefined,
                    open: false,
                    wrap: action.wrap,
                    top: action.top,
                    bottom: action.wrap + ":bottom"
                };
            }
            state[action.verse].open = !state[action.verse].open;
            return { ...state };
        default:
         return state
    }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

store.subscribe(() => {
    const state = store.getState();
    for (var verseId in state) {
        var wrap   = document.getElementById(state[verseId].wrap);
        var top    = document.getElementById(state[verseId].top);
        var bottom = document.getElementById(state[verseId].bottom);

        top.className = (state[verseId].open
            ? "specified-verse"
            : "specifiable-verse");

        if (state[verseId].open && !wrap.contains(bottom)) {
            var bottom = document.createElement("div");
            bottom.id = state[verseId].bottom;
            bottom.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
            wrap.appendChild(bottom);
        }

        if (!state[verseId].open && wrap.contains(bottom)) {
            wrap.removeChild(bottom);
        }
    }
});

_global.toggle = function (verse, wrap, top) {
    store.dispatch({
        type: 'TOGGLE',
        verse: verse,
        wrap: wrap,
        top: top});
};


