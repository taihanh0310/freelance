import {
XUAT_HUY_HANG_CHANGE_LIST,
        XUAT_HUY_HANG_CHANGE_SELECTED_DETAIL,
        XUAT_HUY_HANG_CLEAR_SELECTED_DETAIL,
        XUAT_HUY_HANG_CHANGE_LIST_CHILD,
        XUAT_HUY_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        XUAT_HUY_HANG_PUSH_LIST_CHILD,
        XUAT_HUY_HANG_CLEAR_LIST_CHILD,
        XUAT_HUY_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        XUAT_HUY_HANG_CHANGE_SEARCH_LIST,
        XUAT_HUY_HANG_CHANGE_SEARCH_HOA_DON_LIST
} from '../types';

const INITIAL_STATE = {
    listRoot: [],
    list: [],
    load: false,
    listSearchHoaDon: {
        ngay_ban: {},
        item: []
    },
    search: {
        date_from: moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        from_drug_store_id: -1,
        keyword: ''
    },
    selectedDetail: {

    },
    listChild: {
        list: [],
        selectedDetail: {}
    }
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case XUAT_HUY_HANG_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case XUAT_HUY_HANG_CHANGE_SEARCH_HOA_DON_LIST:
            return {...state, listRoot: action.payload.listRoot, listSearchHoaDon: action.payload.list}
        case XUAT_HUY_HANG_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case XUAT_HUY_HANG_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case XUAT_HUY_HANG_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case XUAT_HUY_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case XUAT_HUY_HANG_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case XUAT_HUY_HANG_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case XUAT_HUY_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case XUAT_HUY_HANG_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
    }
    return state;
};

module.exports = Reducer;