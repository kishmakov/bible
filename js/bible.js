import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'

const persistedState = {
    mainLang: localStorage.getItem('mainLang') || 'ru',
    menu: 'NONE'
};

function bibleApp(state, action) {
    switch (action.type) {
        case 'MENU_SETTINGS':
            state['menu'] = 'SETTINGS';
            return state;
        case 'MENU_BOOKS':
            state['menu'] = 'BOOKS';
            return state;
        case 'MENU_NONE':
            state['menu'] = 'NONE';
            return state;
        case 'RESET_VERSE':
            state[action.verse] = {
                info: undefined,
                open: false,
                wrap: action.wrap,
                top: action.top,
                bottom: action.wrap + ":bottom"
            };
            return state;
        case 'FILL_VERSE':
            state[action.verse].info = action.info;
            return state;
        case 'TOGGLE_VERSE':
            state[action.verse].open = !state[action.verse].open;
            return state;
        default:
         return state
    }
}

let store = createStore(bibleApp, persistedState);

store.subscribe(() => {
    const state = store.getState();
    for (var verseId in state) {
        if (!isNaN(verseId)) {
            var wrap   = document.getElementById(state[verseId].wrap);
            var top    = document.getElementById(state[verseId].top);
            var bottom = document.getElementById(state[verseId].bottom);

            top.className = (state[verseId].open
                ? "specified-verse"
                : "specifiable-verse");

            if (state[verseId].open && !wrap.contains(bottom)) {
                bottom = document.createElement("div");
                bottom.id = state[verseId].bottom;
                bottom.classList.add("specification");
                bottom.appendChild(document.createTextNode(JSON.stringify(state[verseId].info)));
                wrap.appendChild(bottom);
            }

            if (!state[verseId].open && wrap.contains(bottom)) {
                wrap.removeChild(bottom);
            }
        }
    }
});

let menuValue='NONE';

store.subscribe(() => {
    if (menuValue === store.getState()['menu']) {
        return;
    }

    menuValue = store.getState()['menu'];

    var container = document.getElementById("container");
    var menu = document.getElementById("menu");

    if (container.contains(menu)) {
        container.removeChild(menu);
    }

    if (menuValue === 'NONE') {
        return;
    }

    var padding = document.createElement("div");
    padding.className = "col-md-2 col-sm-1";
    var center = document.createElement("div");
    center.className = "col-md-8 col-sm-10";

    if (menuValue === 'BOOKS') {
        center.appendChild(document.createTextNode("Books."));
    } else if (menuValue === 'SETTINGS') {
        center.appendChild(document.createTextNode("Settings."));
    }

    center.appendChild(document.createElement("hr"));

    menu = document.createElement("div");
    menu.className = "row";
    menu.id = "menu";
    menu.appendChild(padding);
    menu.appendChild(center);
    menu.appendChild(padding.cloneNode(true));

    container.insertBefore(menu, container.childNodes[3]);
});

_global.toggleVerse = function (verse, wrap, top) {
    if (!store.getState()[verse]) {
        store.dispatch({type: 'RESET_VERSE', verse: verse, wrap: wrap, top: top});
        fetch(`/specification/${_global.book}/${_global.chapter}/${verse}`)
            .then(response => response.json())
            .then(json => {
                store.dispatch({type: 'FILL_VERSE', verse: verse, info: json});
                store.dispatch({type: 'TOGGLE_VERSE', verse: verse});
            });
    } else {
        store.dispatch({type: 'TOGGLE_VERSE', verse: verse});
    }
};

_global.toggleSettings = function() {
    if (store.getState()['menu'] === 'SETTINGS') {
        store.dispatch({type: 'MENU_NONE'});
    } else {
        store.dispatch({type: 'MENU_SETTINGS'});
    }
};

_global.toggleBooks = function() {
    if (store.getState()['menu'] === 'BOOKS') {
        store.dispatch({type: 'MENU_NONE'});
    } else {
        store.dispatch({type: 'MENU_BOOKS'});
    }
};


