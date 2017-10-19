import {
	STORAGE_POSITION_CHANGE_LIST,
	STORAGE_POSITION_PUSH_LIST,
	STORAGE_POSITION_REMOVE_LIST,
	STORAGE_POSITION_UPDATE_LIST,
	STORAGE_POSITION_CHANGE_SEARCH_LIST,
	STORAGE_POSITION_FILTER_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case STORAGE_POSITION_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case STORAGE_POSITION_PUSH_LIST:
			return {...state, listRoot: [...state.listRoot, action.payload], list: [...state.list, action.payload]};
		case STORAGE_POSITION_REMOVE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), ...state.list.slice(action.payload.key+1)]};
		case STORAGE_POSITION_UPDATE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), action.payload.object, ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), action.payload.object, ...state.list.slice(action.payload.key+1)]};
		case STORAGE_POSITION_CHANGE_SEARCH_LIST:
			return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case STORAGE_POSITION_FILTER_LIST:
			return {...state, list: action.payload};
	}
	return state;
};

module.exports = Reducer;