import {
LOI_NHUAN_THEO_DON_HANG_CHANGE_LIST,
        LOI_NHUAN_THEO_DON_HANG_CHANGE_SELECTED_DETAIL,
        LOI_NHUAN_THEO_DON_HANG_CLEAR_SELECTED_DETAIL,
        LOI_NHUAN_THEO_DON_HANG_CHANGE_LIST_CHILD,
        LOI_NHUAN_THEO_DON_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        LOI_NHUAN_THEO_DON_HANG_CHANGE_SEARCH_LIST,
        LOI_NHUAN_THEO_DON_HANG_PUSH_LIST_CHILD,
        LOI_NHUAN_THEO_DON_HANG_CLEAR_LIST_CHILD,
        LOI_NHUAN_THEO_DON_HANG_CLEAR_LIST,
        LOI_NHUAN_THEO_DON_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: {
        items: [],
        totalInputPrice: 0,
        totalPrice: 0
    },
    load: false,
    search: {
        date_from: moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        medicine_group_id: -1,
        input_output_form_type_id: -1,
        medicine_id: -1,
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
        case LOI_NHUAN_THEO_DON_HANG_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case LOI_NHUAN_THEO_DON_HANG_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case LOI_NHUAN_THEO_DON_HANG_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case LOI_NHUAN_THEO_DON_HANG_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case LOI_NHUAN_THEO_DON_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case LOI_NHUAN_THEO_DON_HANG_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
        case LOI_NHUAN_THEO_DON_HANG_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case LOI_NHUAN_THEO_DON_HANG_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case LOI_NHUAN_THEO_DON_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case LOI_NHUAN_THEO_DON_HANG_CLEAR_LIST: // clear may cai dropdown form search
            return {...state, ...INITIAL_STATE};
    }
    return state;
};

module.exports = Reducer;