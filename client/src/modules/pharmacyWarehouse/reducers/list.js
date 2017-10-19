import {
	PHARMACY_WAREHOUSE_CHANGE_LIST,
	PHARMACY_WAREHOUSE_PUSH_LIST,
	PHARMACY_WAREHOUSE_REMOVE_LIST,
	PHARMACY_WAREHOUSE_UPDATE_LIST,
	PHARMACY_WAREHOUSE_CHANGE_SEARCH_LIST,
	PHARMACY_WAREHOUSE_FILTER_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PHARMACY_WAREHOUSE_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case PHARMACY_WAREHOUSE_PUSH_LIST:
			return {...state, listRoot: [...state.listRoot, action.payload], list: [...state.list, action.payload]};
		case PHARMACY_WAREHOUSE_REMOVE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), ...state.list.slice(action.payload.key+1)]};
		case PHARMACY_WAREHOUSE_UPDATE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), action.payload.object, ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), action.payload.object, ...state.list.slice(action.payload.key+1)]};
		case PHARMACY_WAREHOUSE_CHANGE_SEARCH_LIST:
			return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case PHARMACY_WAREHOUSE_FILTER_LIST:
			return {...state, list: action.payload};
	}
	return state;
};

module.exports = Reducer;