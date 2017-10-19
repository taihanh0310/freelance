import {
	BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_SELECTED_DETAIL,
	BAO_CAO_XUAT_NHAP_TON_CLEAR_SELECTED_DETAIL,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        BAO_CAO_XUAT_NHAP_TON_CHANGE_SEARCH_LIST,
	BAO_CAO_XUAT_NHAP_TON_PUSH_LIST_CHILD,
	BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD,
	BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: {bao_cao: [], total: 0}, load: false, search: {
        date_from:  moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        keyword: '',
        pharma_warehouse_id: -1,
        medicine_group_id: -1,
        supplier_id: -1,
        data_connected: 1, // du lieu ket xuat
        see_detail: 1, // xem chi tiet
        see_shipment_no: 1, // xem theo so lo
        medicine_input_output:1 // hang nhap xuat
    }, 
    selectedDetail: {}, 
    listChild: 
    {
	list: [], 
	selectedDetail: {}
    }
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case BAO_CAO_XUAT_NHAP_TON_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case BAO_CAO_XUAT_NHAP_TON_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
                case BAO_CAO_XUAT_NHAP_TON_CHANGE_SEARCH_LIST: 
                    return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case BAO_CAO_XUAT_NHAP_TON_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
		case BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
	}
	return state;
};

module.exports = Reducer;