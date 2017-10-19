import {
	MEDICINE_UPDATE_PRICE_CHANGE_LIST,
	MEDICINE_UPDATE_PRICE_PUSH_LIST,
	MEDICINE_UPDATE_PRICE_REMOVE_LIST,
	MEDICINE_UPDATE_PRICE_UPDATE_LIST,
	MEDICINE_UPDATE_PRICE_CHANGE_SEARCH_LIST,
	MEDICINE_UPDATE_PRICE_FILTER_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MEDICINE_UPDATE_PRICE_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case MEDICINE_UPDATE_PRICE_PUSH_LIST:
			return {...state, listRoot: [...state.listRoot, action.payload], list: [...state.list, action.payload]};
		case MEDICINE_UPDATE_PRICE_REMOVE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), ...state.list.slice(action.payload.key+1)]};
		case MEDICINE_UPDATE_PRICE_UPDATE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), action.payload.object, ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), action.payload.object, ...state.list.slice(action.payload.key+1)]};
		case MEDICINE_UPDATE_PRICE_CHANGE_SEARCH_LIST:
			return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case MEDICINE_UPDATE_PRICE_FILTER_LIST:
			return {...state, list: action.payload};
	}
	return state;
};

module.exports = Reducer;