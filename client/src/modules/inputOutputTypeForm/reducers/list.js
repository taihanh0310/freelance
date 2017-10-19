import {
	INPUT_OUTPUT_TYPE_FORM_CHANGE_LIST,
	INPUT_OUTPUT_TYPE_FORM_PUSH_LIST,
	INPUT_OUTPUT_TYPE_FORM_REMOVE_LIST,
	INPUT_OUTPUT_TYPE_FORM_UPDATE_LIST,
	INPUT_OUTPUT_TYPE_FORM_CHANGE_SEARCH_LIST,
	INPUT_OUTPUT_TYPE_FORM_FILTER_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case INPUT_OUTPUT_TYPE_FORM_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case INPUT_OUTPUT_TYPE_FORM_PUSH_LIST:
			return {...state, listRoot: [...state.listRoot, action.payload], list: [...state.list, action.payload]};
		case INPUT_OUTPUT_TYPE_FORM_REMOVE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), ...state.list.slice(action.payload.key+1)]};
		case INPUT_OUTPUT_TYPE_FORM_UPDATE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), action.payload.object, ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), action.payload.object, ...state.list.slice(action.payload.key+1)]};
		case INPUT_OUTPUT_TYPE_FORM_CHANGE_SEARCH_LIST:
			return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case INPUT_OUTPUT_TYPE_FORM_FILTER_LIST:
			return {...state, list: action.payload};
	}
	return state;
};

module.exports = Reducer;