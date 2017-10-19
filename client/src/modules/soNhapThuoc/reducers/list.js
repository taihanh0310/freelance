import {
	SO_NHAP_THUOC_CHANGE_LIST,
	SO_NHAP_THUOC_CHANGE_SELECTED_DETAIL,
	SO_NHAP_THUOC_CLEAR_SELECTED_DETAIL,
	SO_NHAP_THUOC_CHANGE_LIST_CHILD,
	SO_NHAP_THUOC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        SO_NHAP_THUOC_CHANGE_SEARCH_LIST,
	SO_NHAP_THUOC_PUSH_LIST_CHILD,
	SO_NHAP_THUOC_CLEAR_LIST_CHILD,
	SO_NHAP_THUOC_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {
        date_from:  moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
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
	switch(action.type){
		case SO_NHAP_THUOC_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case SO_NHAP_THUOC_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case SO_NHAP_THUOC_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case SO_NHAP_THUOC_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case SO_NHAP_THUOC_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
                case SO_NHAP_THUOC_CHANGE_SEARCH_LIST: 
                    return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case SO_NHAP_THUOC_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case SO_NHAP_THUOC_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
		case SO_NHAP_THUOC_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
	}
	return state;
};

module.exports = Reducer;