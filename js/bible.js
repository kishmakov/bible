import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'

const persistedState = {
    supportiveLangs: (localStorage.getItem('supportiveLangs') || '').split(':').filter(s => s.length > 0),
    menu: 'NONE'
};

function bibleApp(state, action) {
    switch (action.type) {
        case 'ADD_SUPPORTIVE_LANG':
            if (state.supportiveLangs.indexOf(action.lang) == -1) {
                state.supportiveLangs.push(action.lang);
            }
            return state;
        case 'REMOVE_SUPPORTIVE_LANG':
            var index = state.supportiveLangs.indexOf(action.lang);
            if (index > -1) {
                state.supportiveLangs.splice(index, 1);
            }
            return state;
        case 'MENU_SETTINGS':
            state.menu = 'SETTINGS';
            return state;
        case 'MENU_BOOKS':
            state.menu = 'BOOKS';
            return state;
        case 'MENU_NONE':
            state.menu = 'NONE';
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

function header4(title) {
    var h4 = document.createElement("h4");
    h4.innerHTML = title;
    var div = document.createElement("div");
    div.appendChild(h4);
    return div;
}

function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

function addSupportiveLang(container, langCode, languageSelfName) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.disabled = getCookie('lang') === langCode;
    checkbox.defaultChecked = checkbox.disabled
        || (store.getState().supportiveLangs.indexOf(langCode) > -1);
    checkbox.onclick = function() {
        const action = this.checked ? 'ADD_SUPPORTIVE_LANG' : 'REMOVE_SUPPORTIVE_LANG';
        store.dispatch({type: action, lang: langCode});
    };

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(languageSelfName));

    var div = document.createElement("div");
    div.className = "checkbox";
    div.appendChild(label);
    container.appendChild(div);
}

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

    var padding = document.createElement('div');
    padding.className = 'col-md-2 col-sm-1';
    var center = document.createElement("div");
    center.className = 'col-md-8 col-sm-10';

    if (menuValue === 'BOOKS') {
        center.appendChild(document.createTextNode('Books.'));
    } else if (menuValue === 'SETTINGS') {
        var supportiveLangs = document.createElement('div');
        supportiveLangs.className = 'checkbox';
        supportiveLangs.appendChild(header4('Уточняющие языки'));
        addSupportiveLang(supportiveLangs, 'chu', 'Церковнославянский');
        addSupportiveLang(supportiveLangs, 'la', 'Latina');
        addSupportiveLang(supportiveLangs, 'gr', 'Ελληνικά');
        addSupportiveLang(supportiveLangs, 'ru', 'Русский');
        center.appendChild(supportiveLangs);
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

store.subscribe(() => {
    const supportiveLangs = store.getState().supportiveLangs.join(":");
    localStorage.setItem('supportiveLangs', supportiveLangs);
});

_global.toggleVerse = function (verse, wrap, top, lang) {
    if (!store.getState()[verse]) {
        store.dispatch({type: 'RESET_VERSE', verse: verse, wrap: wrap, top: top});
        fetch(`/info/${_global.book}/${_global.chapter}/${verse}/${lang}/`)
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


