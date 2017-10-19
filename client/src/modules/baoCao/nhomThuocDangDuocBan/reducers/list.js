import {
NHOM_THUOC_DANG_DUOC_BAN_CHANGE_LIST,
        NHOM_THUOC_DANG_DUOC_BAN_CHANGE_SELECTED_DETAIL,
        NHOM_THUOC_DANG_DUOC_BAN_CLEAR_SELECTED_DETAIL,
        NHOM_THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD,
        NHOM_THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        NHOM_THUOC_DANG_DUOC_BAN_CHANGE_SEARCH_LIST,
        NHOM_THUOC_DANG_DUOC_BAN_PUSH_LIST_CHILD,
        NHOM_THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD,
        NHOM_THUOC_DANG_DUOC_BAN_CLEAR_LIST,
        NHOM_THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD_SELECTED_DETAIL
        } from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {
        from_drug_store_id: -1
    },
    selectedDetail: {},
    listChild:
            {
                list: [],
                selectedDetail: {}
            }
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NHOM_THUOC_DANG_DUOC_BAN_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case NHOM_THUOC_DANG_DUOC_BAN_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case NHOM_THUOC_DANG_DUOC_BAN_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case NHOM_THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case NHOM_THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case NHOM_THUOC_DANG_DUOC_BAN_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
        case NHOM_THUOC_DANG_DUOC_BAN_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case NHOM_THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case NHOM_THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case NHOM_THUOC_DANG_DUOC_BAN_CLEAR_LIST: // clear may cai dropdown form search
            return {...state, ...INITIAL_STATE};
    }
    return state;
};

module.exports = Reducer;