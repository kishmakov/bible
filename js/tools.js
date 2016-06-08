function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

export const currentLang = getCookie('lang');

export function urlForLang(langCode) {
    return _global.baseUrl + `${langCode}/`;
}

