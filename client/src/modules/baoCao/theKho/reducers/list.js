import {
THE_KHO_CHANGE_LIST,
        THE_KHO_CHANGE_SELECTED_DETAIL,
        THE_KHO_CLEAR_SELECTED_DETAIL,
        THE_KHO_CHANGE_LIST_CHILD,
        THE_KHO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        THE_KHO_CHANGE_SEARCH_LIST,
        THE_KHO_PUSH_LIST_CHILD,
        THE_KHO_CLEAR_LIST_CHILD,
        THE_KHO_CLEAR_LIST,
        THE_KHO_CLEAR_LIST_CHILD_SELECTED_DETAIL
        } from '../types';

const INITIAL_STATE = {listRoot: [], list: {items: [], tonDauKi: 0, tongNhap: 0,tongTienNhap:0,tongXuat:0, tongTienXuat:0, tonConLai: 0}, load: false, search: {
        date_from: moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        from_drug_store_id: -1,
        medicine_id: -1
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
        case THE_KHO_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case THE_KHO_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case THE_KHO_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case THE_KHO_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case THE_KHO_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case THE_KHO_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
        case THE_KHO_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case THE_KHO_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case THE_KHO_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case THE_KHO_CLEAR_LIST: // clear may cai dropdown form search
            return {...state, ...INITIAL_STATE};
    }
    return state;
};

module.exports = Reducer;