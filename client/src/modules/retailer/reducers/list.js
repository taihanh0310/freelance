import {
RETAILER_CHANGE_LIST,
        RETAILER_CHANGE_SELECTED_DETAIL,
        RETAILER_CLEAR_SELECTED_DETAIL,
        RETAILER_CHANGE_LIST_CHILD,
        RETAILER_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        RETAILER_PUSH_LIST_CHILD,
        RETAILER_CLEAR_LIST_CHILD,
        RETAILER_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        RETAILER_CHANGE_SEARCH_LIST,
        RETAILER_CHANGE_SEARCH_HOA_DON_LIST
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
        type: 1,
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
        case RETAILER_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case RETAILER_CHANGE_SEARCH_HOA_DON_LIST:
            return {...state, listRoot: action.payload.listRoot, listSearchHoaDon: action.payload.list}
        case RETAILER_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case RETAILER_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case RETAILER_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case RETAILER_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case RETAILER_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case RETAILER_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case RETAILER_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case RETAILER_CHANGE_SEARCH_LIST: 
                    return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
    }
    return state;
};

module.exports = Reducer;