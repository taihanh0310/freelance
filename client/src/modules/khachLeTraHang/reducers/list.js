import {
        KHACH_LE_TRA_HANG_CHANGE_LIST,
        KHACH_LE_TRA_HANG_CHANGE_SEARCH_RESULT_LIST,
        KHACH_LE_TRA_HANG_CHANGE_SEARCH_RESULT_SELECTED_DETAIL,
        KHACH_LE_TRA_HANG_CHANGE_SELECTED_DETAIL,
        KHACH_LE_TRA_HANG_CLEAR_SELECTED_DETAIL,
        KHACH_LE_TRA_HANG_CHANGE_LIST_CHILD,
        KHACH_LE_TRA_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        KHACH_LE_TRA_HANG_PUSH_LIST_CHILD,
        KHACH_LE_TRA_HANG_CLEAR_LIST_CHILD,
        KHACH_LE_TRA_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        KHACH_LE_TRA_HANG_CHANGE_SEARCH_LIST
        } from '../types';

const INITIAL_STATE = {
    listRoot: [],
    list: [],
    load: false,
    search: {
        product_input_code: '',
        medicine_name: '',
        shipment_no: '',
        delivery_date_from: moment().add(-1, 'months'),
        delivery_date_to: moment().add(0, 'days')
    },
    searchResult: {
        list: [],
        searchResultSelectedDetail: {}
    },
    selectedDetail: {},
    listChild: {
        list: [],
        selectedDetail: {}
    }
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case KHACH_LE_TRA_HANG_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case KHACH_LE_TRA_HANG_CHANGE_SEARCH_RESULT_LIST:
            return {...state, searchResult: {...state.searchResult, list: action.payload}};
        case KHACH_LE_TRA_HANG_CHANGE_SEARCH_RESULT_SELECTED_DETAIL:
            return {...state, searchResult: {...state.searchResult, searchResultSelectedDetail: {}}};
        case KHACH_LE_TRA_HANG_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case KHACH_LE_TRA_HANG_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case KHACH_LE_TRA_HANG_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case KHACH_LE_TRA_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case KHACH_LE_TRA_HANG_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case KHACH_LE_TRA_HANG_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case KHACH_LE_TRA_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case KHACH_LE_TRA_HANG_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
    }
    return state;
};

module.exports = Reducer;