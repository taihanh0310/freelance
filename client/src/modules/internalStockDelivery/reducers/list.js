import {
	INTERNAL_STOCK_DELIVERY_CHANGE_LIST,
	INTERNAL_STOCK_DELIVERY_CHANGE_SELECTED_DETAIL,
	INTERNAL_STOCK_DELIVERY_CLEAR_SELECTED_DETAIL,
	INTERNAL_STOCK_DELIVERY_CHANGE_LIST_CHILD,
	INTERNAL_STOCK_DELIVERY_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	INTERNAL_STOCK_DELIVERY_CLEAR_LIST_CHILD_SELECTED_DETAIL,
	INTERNAL_STOCK_DELIVERY_PUSH_LIST_CHILD,
	INTERNAL_STOCK_DELIVERY_CLEAR_LIST_CHILD,
        INTERNAL_STOCK_DELIVERY_FORM_CHILD_UPDATE_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}, selectedDetail: {}, 
	listChild: {
		list: [], 
		selectedDetail: {}
	}
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case INTERNAL_STOCK_DELIVERY_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case INTERNAL_STOCK_DELIVERY_CHANGE_SELECTED_DETAIL:
			return {...state, selectedDetail: action.payload};
		case INTERNAL_STOCK_DELIVERY_CLEAR_SELECTED_DETAIL:
			return {...state, selectedDetail: {}};
		case INTERNAL_STOCK_DELIVERY_CHANGE_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: action.payload}};
		case INTERNAL_STOCK_DELIVERY_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: action.payload}};
		case INTERNAL_STOCK_DELIVERY_CLEAR_LIST_CHILD_SELECTED_DETAIL:
			return {...state, listChild: {...state.listChild, selectedDetail: {}}};
		case INTERNAL_STOCK_DELIVERY_PUSH_LIST_CHILD:
			return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
		case INTERNAL_STOCK_DELIVERY_CLEAR_LIST_CHILD:
			return {...state, listChild: INITIAL_STATE.listChild};
                case INTERNAL_STOCK_DELIVERY_FORM_CHILD_UPDATE_LIST:
                        return {...state, listChild: {...state.listChild, list: [...state.listChild.list, action.payload]}};
	}
	return state;
};

module.exports = Reducer;