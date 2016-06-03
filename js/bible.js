import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'

function counter(state = {}, action) {
    switch (action.type) {
        case 'RESET':
            state[action.verse] = {
                info: undefined,
                open: false,
                wrap: action.wrap,
                top: action.top,
                bottom: action.wrap + ":bottom"
            };
            return state;
        case 'FILL':
            state[action.verse].info = action.info;
            return state;
        case 'TOGGLE':
            state[action.verse].open = !state[action.verse].open;
            return state;
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
            bottom = document.createElement("div");
            bottom.id = state[verseId].bottom;
            bottom.classList.add("specification")
            bottom.appendChild(document.createTextNode(JSON.stringify(state[verseId].info)));
            wrap.appendChild(bottom);
        }

        if (!state[verseId].open && wrap.contains(bottom)) {
            wrap.removeChild(bottom);
        }
    }
});

_global.toggle = function (verse, wrap, top) {
    if (!store.getState()[verse]) {
        store.dispatch({type: 'RESET', verse: verse, wrap: wrap, top: top});
        fetch(`/specification/${_global.book}/${_global.chapter}/${verse}`)
            .then(response => response.json())
            .then(json => {
                store.dispatch({type: 'FILL', verse: verse, info: json});
                store.dispatch({type: 'TOGGLE', verse: verse});
            });
    } else {
        store.dispatch({type: 'TOGGLE', verse: verse});
    }
};


