import { createStore } from 'redux'

let persistedState = {
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
        case 'MENU_BOOKS':
        case 'MENU_NONE':
            state.menu = action.type.substring(5);
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

export default store;

