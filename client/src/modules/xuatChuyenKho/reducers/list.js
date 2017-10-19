import {
	XUAT_CHUYEN_KHO_CHANGE_LIST,
	XUAT_CHUYEN_KHO_CHANGE_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_CLEAR_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD,
	XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_PUSH_LIST_CHILD,
	XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD,
        XUAT_CHUYEN_KHO_FORM_CHILD_UPDATE_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}, selectedDetail: {}, 
	listChild: {
		list: [], 
		selectedDetail: {}
	}
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case XUAT_CHUYEN_KHO_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case XUAT_CHUYEN_KHO_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case XUAT_CHUYEN_KHO_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
		case XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
		case XUAT_CHUYEN_KHO_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
                case XUAT_CHUYEN_KHO_FORM_CHILD_UPDATE_LIST:
                        return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
	}
	return state;
};

module.exports = Reducer;