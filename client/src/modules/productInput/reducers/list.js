import {
	PRODUCT_INPUT_CHANGE_LIST,
	PRODUCT_INPUT_CHANGE_SELECTED_DETAIL,
	PRODUCT_INPUT_CLEAR_SELECTED_DETAIL,
	PRODUCT_INPUT_CHANGE_LIST_CHILD,
	PRODUCT_INPUT_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	PRODUCT_INPUT_PUSH_LIST_CHILD,
	PRODUCT_INPUT_CLEAR_LIST_CHILD,
	PRODUCT_INPUT_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}, selectedDetail: {}, 
	listChild: {
		list: [], 
		selectedDetail: {}
	}
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PRODUCT_INPUT_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case PRODUCT_INPUT_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case PRODUCT_INPUT_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case PRODUCT_INPUT_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case PRODUCT_INPUT_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
		case PRODUCT_INPUT_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case PRODUCT_INPUT_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
		case PRODUCT_INPUT_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
	}
	return state;
};

module.exports = Reducer;