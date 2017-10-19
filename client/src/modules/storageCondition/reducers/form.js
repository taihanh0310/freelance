import {
	STORAGE_CONDITION_CHANGE_DETAIL,
	STORAGE_CONDITION_CLEAR_DETAIL,
	STORAGE_CONDITION_FORM_CHANGE,
	STORAGE_CONDITION_FORM_VALIDATION,
	STORAGE_CONDITION_FORM_CLEAR,
	STORAGE_CONDITION_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', code: '', position: 1};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case STORAGE_CONDITION_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case STORAGE_CONDITION_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case STORAGE_CONDITION_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case STORAGE_CONDITION_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case STORAGE_CONDITION_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case STORAGE_CONDITION_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;