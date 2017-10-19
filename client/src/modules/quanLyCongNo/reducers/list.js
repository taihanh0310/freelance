import {
	QUAN_LY_CONG_NO_CHANGE_LIST,
	QUAN_LY_CONG_NO_CHANGE_SELECTED_DETAIL,
	QUAN_LY_CONG_NO_CLEAR_SELECTED_DETAIL,
	QUAN_LY_CONG_NO_CHANGE_LIST_CHILD,
	QUAN_LY_CONG_NO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        QUAN_LY_CONG_NO_CHANGE_SEARCH_LIST,
	QUAN_LY_CONG_NO_PUSH_LIST_CHILD,
	QUAN_LY_CONG_NO_CLEAR_LIST_CHILD,
	QUAN_LY_CONG_NO_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: {cong_no: [], total: 0}, load: false, search: {
        date_from:  moment().add(-1, 'months'),
        date_to: moment().add(0, 'days'),
        keyword: '',
        type: 0,
        supplier_id: -1
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
		case QUAN_LY_CONG_NO_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case QUAN_LY_CONG_NO_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case QUAN_LY_CONG_NO_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case QUAN_LY_CONG_NO_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case QUAN_LY_CONG_NO_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
                case QUAN_LY_CONG_NO_CHANGE_SEARCH_LIST: 
                    return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case QUAN_LY_CONG_NO_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case QUAN_LY_CONG_NO_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
		case QUAN_LY_CONG_NO_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
	}
	return state;
};

module.exports = Reducer;