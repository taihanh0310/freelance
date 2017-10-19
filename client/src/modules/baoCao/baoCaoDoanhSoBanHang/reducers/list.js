import {
BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_LIST,
        BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_SELECTED_DETAIL,
        BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_SELECTED_DETAIL,
        BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_LIST_CHILD,
        BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_SEARCH_LIST,
        BAO_CAO_DOANH_SO_BAN_HANG_PUSH_LIST_CHILD,
        BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_LIST_CHILD,
        BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_LIST,
        BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL
        } from '../types';

const INITIAL_STATE = {listRoot: [], list: {items: [], totalPriceDay: 0, totalPriceMonth: 0, totalPriceSearch: 0}, load: false, search: {
        date_from: moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        input_output_form_type_id: -1,
        user_id: -1, // Nhan vien ban hang
        month_search: moment().add(0, 'days'), // tinh doanh thu theo thang dang duoc chon
        day_search: moment().add(0, 'days'), // tinh doanh thu theo ngay dang duoc chon
        type: 1, // Mac dinh, 1: theo ngay, 2: theo khach hang, 3: theo ca
        house: 13
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
        case BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_LIST:
            return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
        case BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_SELECTED_DETAIL:
            return {...state, selectedDetail: action.payload};
        case BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_SELECTED_DETAIL:
            return {...state, selectedDetail: {}};
        case BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: action.payload}};
        case BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
        case BAO_CAO_DOANH_SO_BAN_HANG_CHANGE_SEARCH_LIST:
            return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
        case BAO_CAO_DOANH_SO_BAN_HANG_PUSH_LIST_CHILD:
            return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
        case BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_LIST_CHILD:
            return {...state, listChild: INITIAL_STATE.listChild};
        case BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL:
            return {...state, listChild: {...state.listChild, selectedDetail: {}}};
        case BAO_CAO_DOANH_SO_BAN_HANG_CLEAR_LIST: // clear may cai dropdown form search
            return {...state, ...INITIAL_STATE};
    }
    return state;
};

module.exports = Reducer;