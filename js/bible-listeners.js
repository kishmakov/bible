import store from './bible-store'
import {locateMenu} from './menu'

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

function createAfresh(container, id) {
    let element = document.getElementById(id);
    if (container.contains(element)) {
        container.removeChild(element);
    }

    element = document.createElement('div');
    element.className = 'row';
    element.id = id;

    let padding = document.createElement('div');
    padding.className = 'col-md-2 col-sm-1';

    element.appendChild(padding);
    element.appendChild(padding.cloneNode(true));

    return element;
}

function insertInto(container, className) {
    let element = document.createElement('div');
    element.className = className;

    let childrenNum = container.childNodes.length;
    container.insertBefore(element, container.childNodes[childrenNum - 1]);

    return element;
}

export function menuListener() {
    if (menuValue === store.getState()['menu']) {
        return;
    }

    menuValue = store.getState()['menu'];

    let container = document.getElementById('container');

    let menu = createAfresh(container, 'menu');
    let menuPadding = createAfresh(container, 'menu-padding');

    if (menuValue === 'NONE') {
        return;
    }

    if (menuValue === 'BOOKS') {
        let center = insertInto(menu, 'col-md-8 col-sm-10');
        center.appendChild(document.createTextNode('Books.'));
    } else if (menuValue === 'SETTINGS') {
        let centerLeft = insertInto(menu, 'col-md-4 col-sm-5');
        let centerRight = insertInto(menu, 'col-md-4 col-sm-5');
        locateMenu(centerLeft, centerRight);
    }

    let hr = insertInto(menuPadding, 'col-md-8 col-sm-10');
    hr.appendChild(document.createElement('hr'));

    container.insertBefore(menu, container.childNodes[3]);
    container.insertBefore(menuPadding, container.childNodes[4])
}

export function langsListener() {
    let supportiveLangs = store.getState().supportiveLangs.join(":");
    localStorage.setItem('supportiveLangs', supportiveLangs);
}