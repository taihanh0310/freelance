import {
BAO_CAO_XUAT_HANG_CHANGE_LIST,
        BAO_CAO_XUAT_HANG_CHANGE_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CLEAR_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD,
        BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CHANGE_SEARCH_LIST,
        BAO_CAO_XUAT_HANG_PUSH_LIST_CHILD,
        BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD,
        BAO_CAO_XUAT_HANG_CLEAR_LIST,
        BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: {
        items: [],
        count_item: 0,
        totalPrice: 0,
        totalQuanlity: 0
    },
    load: false,
    search: {
        date_from: moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        from_drug_store_id: -1,
        medicine_group_id: -1,
        input_output_form_type_id: -1,
        customer_id: -1,
        keyword: ''
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
        case BAO_CAO_XUAT_HANG_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case BAO_CAO_XUAT_HANG_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case BAO_CAO_XUAT_HANG_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case BAO_CAO_XUAT_HANG_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
        case BAO_CAO_XUAT_HANG_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case BAO_CAO_XUAT_HANG_CLEAR_LIST: // clear may cai dropdown form search
            return {...state, ...INITIAL_STATE};
    }
    return state;
};

module.exports = Reducer;