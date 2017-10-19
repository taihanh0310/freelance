import {
	PHIEU_CHI_CHANGE_LIST,
	PHIEU_CHI_CHANGE_SELECTED_DETAIL,
	PHIEU_CHI_CLEAR_SELECTED_DETAIL,
	PHIEU_CHI_CHANGE_LIST_CHILD,
	PHIEU_CHI_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        PHIEU_CHI_CHANGE_SEARCH_LIST,
	PHIEU_CHI_PUSH_LIST_CHILD,
	PHIEU_CHI_CLEAR_LIST_CHILD,
	PHIEU_CHI_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {
        date_from:  moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        keyword: '',
        type:0
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
		case PHIEU_CHI_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case PHIEU_CHI_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case PHIEU_CHI_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case PHIEU_CHI_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case PHIEU_CHI_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
                case PHIEU_CHI_CHANGE_SEARCH_LIST: 
                    return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case PHIEU_CHI_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case PHIEU_CHI_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
		case PHIEU_CHI_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
	}
	return state;
};

module.exports = Reducer;