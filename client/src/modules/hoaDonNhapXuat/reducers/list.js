import {
	HOA_DON_NHAP_XUAT_CHANGE_LIST,
	HOA_DON_NHAP_XUAT_CHANGE_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_CLEAR_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD,
	HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_PUSH_LIST_CHILD,
	HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD,
	HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}, selectedDetail: {}, 
	listChild: {
		list: [], 
		selectedDetail: {}
	}
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case HOA_DON_NHAP_XUAT_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case HOA_DON_NHAP_XUAT_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case HOA_DON_NHAP_XUAT_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
		case HOA_DON_NHAP_XUAT_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
		case HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
	}
	return state;
};

module.exports = Reducer;