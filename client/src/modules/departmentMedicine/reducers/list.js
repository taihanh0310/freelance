import {
	DEPARTMENT_MEDICINE_CHANGE_LIST,
	DEPARTMENT_MEDICINE_PUSH_LIST,
	DEPARTMENT_MEDICINE_REMOVE_LIST,
	DEPARTMENT_MEDICINE_UPDATE_LIST,
	DEPARTMENT_MEDICINE_CHANGE_SEARCH_LIST,
	DEPARTMENT_MEDICINE_FILTER_LIST,
	DEPARTMENT_MEDICINE_CHANGE_DOCTORS,
	DEPARTMENT_MEDICINE_CLEAR_DOCTORS
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], selectedDoctors: [], load: false, search: {name: ''}};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case DEPARTMENT_MEDICINE_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
		case DEPARTMENT_MEDICINE_PUSH_LIST:
			return {...state, listRoot: [...state.listRoot, action.payload], list: [...state.list, action.payload]};
		case DEPARTMENT_MEDICINE_REMOVE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), ...state.list.slice(action.payload.key+1)]};
		case DEPARTMENT_MEDICINE_UPDATE_LIST:
			return {...state, listRoot: [...state.listRoot.slice(0, action.payload.keyRoot), action.payload.object, ...state.listRoot.slice(action.payload.keyRoot+1)], list: [...state.list.slice(0, action.payload.key), action.payload.object, ...state.list.slice(action.payload.key+1)]};
		case DEPARTMENT_MEDICINE_CHANGE_SEARCH_LIST:
			return {...state, search: {...state.search, [action.payload.field]: action.payload.value}};
		case DEPARTMENT_MEDICINE_FILTER_LIST:
			return {...state, list: action.payload};
		case DEPARTMENT_MEDICINE_CHANGE_DOCTORS:
			return {...state, selectedDoctors: action.payload};
		case DEPARTMENT_MEDICINE_CLEAR_DOCTORS:
			return {...state, selectedDoctors: []};
	}
	return state;
};

module.exports = Reducer;