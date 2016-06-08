import store from './bible-store'
import locateMenu from './menu'

export function verseListener() {
    let state = store.getState();
    for (var verseId in state) {
        if (state.hasOwnProperty(verseId) && !isNaN(verseId)) {
            let wrap   = document.getElementById(state[verseId].wrap);
            let top    = document.getElementById(state[verseId].top);
            let bottom = document.getElementById(state[verseId].bottom);

            top.className = (state[verseId].open ? "specified-verse" : "verse");

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
}

let menuValue='NONE';

export function menuListener() {
    if (menuValue === store.getState()['menu']) {
        return;
    }

    menuValue = store.getState()['menu'];

    let container = document.getElementById("container");
    let menu = document.getElementById("menu");

    if (container.contains(menu)) {
        container.removeChild(menu);
    }

    if (menuValue === 'NONE') {
        return;
    }

    let padding = document.createElement('div');
    padding.className = 'col-md-2 col-sm-1';
    let center = document.createElement("div");
    center.className = 'col-md-8 col-sm-10';

    if (menuValue === 'BOOKS') {
        center.appendChild(document.createTextNode('Books.'));
    } else if (menuValue === 'SETTINGS') {
        locateMenu(center);
    }

    center.appendChild(document.createElement("hr"));

    menu = document.createElement("div");
    menu.className = "row";
    menu.id = "menu";
    menu.appendChild(padding);
    menu.appendChild(center);
    menu.appendChild(padding.cloneNode(true));

    container.insertBefore(menu, container.childNodes[3]);
}

export function langsListener() {
    let supportiveLangs = store.getState().supportiveLangs.join(":");
    localStorage.setItem('supportiveLangs', supportiveLangs);
}