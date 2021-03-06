import store from './bible-store'
import {currentLang, headers, languages, urlForLang} from './tools'

function header4(title) {
    var h4 = document.createElement("h4");
    h4.innerHTML = title;
    var div = document.createElement("div");
    div.appendChild(h4);
    return div;
}

function addSupportiveLang(container, code, selfName) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.defaultChecked = store.getState().supportiveLangs.indexOf(code) > -1;
    checkbox.onclick = function() {
        const action = this.checked ? 'ADD_SUPPORTIVE_LANG' : 'REMOVE_SUPPORTIVE_LANG';
        store.dispatch({type: action, lang: code});
    };

    let label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(selfName));
    label.className = 'font-' + code;

    let div = document.createElement('div');
    div.className = 'checkbox';
    div.appendChild(label);
    container.appendChild(div);
}

function addLang(container, code, selfName) {
    var link = document.createElement('a');
    link.className = 'font-' + code;
    link.appendChild(document.createTextNode(selfName));
    link.href = urlForLang(code);
    var p = document.createElement('p');
    p.appendChild(link);
    container.appendChild(p);
}

export function locateMenu(langs, supportiveLangs) {
    langs.appendChild(header4(headers.languageSelection));

    supportiveLangs.appendChild(header4(headers.supportiveLanguages));

    for (var langCode in languages) {
        if (languages.hasOwnProperty(langCode) && langCode != currentLang) {
            addLang(langs, langCode, languages[langCode]);
            addSupportiveLang(supportiveLangs, langCode, languages[langCode]);
        }
    }
}
