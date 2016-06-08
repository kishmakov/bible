import store from './bible-store'
import {langsListener, menuListener, verseListener} from './bible-listeners'
import fetch from 'isomorphic-fetch'

store.subscribe(langsListener);
store.subscribe(menuListener);
store.subscribe(verseListener);

_global.toggleVerse = function (book, chapter, verse, wrap, top, lang) {
    if (!store.getState()[verse]) {
        store.dispatch({type: 'RESET_VERSE', verse: verse, wrap: wrap, top: top});
        fetch(`/info/${book}/${chapter}/${verse}/${lang}/`)
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


