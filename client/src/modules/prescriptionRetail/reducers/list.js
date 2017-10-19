import {
PRESCRIPTION_RETAIL_CHANGE_LIST,
        PRESCRIPTION_RETAIL_CHANGE_SELECTED_DETAIL,
        PRESCRIPTION_RETAIL_CLEAR_SELECTED_DETAIL,
        PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD,
        PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        PRESCRIPTION_RETAIL_PUSH_LIST_CHILD,
        PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD,
        PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        PRESCRIPTION_RETAIL_CHANGE_SEARCH_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false,
    search: {
        date_from: moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        type: 0,
        from_drug_store_id: -1,
        keyword: ''
    }
    , selectedDetail: {},
    listChild: {
        list: [],
        selectedDetail: {}
    }
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRESCRIPTION_RETAIL_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case PRESCRIPTION_RETAIL_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case PRESCRIPTION_RETAIL_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case PRESCRIPTION_RETAIL_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case PRESCRIPTION_RETAIL_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
    }
    return state;
};

module.exports = Reducer;