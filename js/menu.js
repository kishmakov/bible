import store from './bible-store'
import {currentLang} from './tools'

function header4(title) {
    var h4 = document.createElement("h4");
    h4.innerHTML = title;
    var div = document.createElement("div");
    div.appendChild(h4);
    return div;
}

function addSupportiveLang(container, langCode, languageSelfName) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.disabled = currentLang === langCode;
    checkbox.defaultChecked = checkbox.disabled
        || (store.getState().supportiveLangs.indexOf(langCode) > -1);
    checkbox.onclick = function() {
        const action = this.checked ? 'ADD_SUPPORTIVE_LANG' : 'REMOVE_SUPPORTIVE_LANG';
        store.dispatch({type: action, lang: langCode});
    };

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(languageSelfName));

    var div = document.createElement('div');
    div.className = 'checkbox' + (checkbox.disabled ? ' disabled' : '');
    div.appendChild(label);
    container.appendChild(div);
}

function addLang(container, langCode, languageSelfName) {
    var link = document.createElement('a');
    link.appendChild(document.createTextNode(languageSelfName));
    link.href = _global.langFreeUrl + `${langCode}/`;
    var p = document.createElement('p');
    p.appendChild(link);
    container.appendChild(p);
}

function locateMenu(container) {
    var langs = document.createElement('div');
    langs.appendChild(header4('Язык'));
    addLang(langs, 'chu', 'Церковнославянский');
    addLang(langs, 'ru', 'Русский');
    container.appendChild(langs);

    var supportiveLangs = document.createElement('div');
    supportiveLangs.className = 'checkbox';
    supportiveLangs.appendChild(header4('Уточняющие языки'));
    addSupportiveLang(supportiveLangs, 'chu', 'Церковнославянский');
    addSupportiveLang(supportiveLangs, 'la', 'Latina');
    addSupportiveLang(supportiveLangs, 'gr', 'Ελληνικά');
    addSupportiveLang(supportiveLangs, 'ru', 'Русский');
    container.appendChild(supportiveLangs);
}

export default locateMenu;