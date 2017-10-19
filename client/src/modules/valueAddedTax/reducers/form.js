import {
	VALUE_ADDED_TAX_CHANGE_DETAIL,
	VALUE_ADDED_TAX_CLEAR_DETAIL,
	VALUE_ADDED_TAX_FORM_CHANGE,
	VALUE_ADDED_TAX_FORM_VALIDATION,
	VALUE_ADDED_TAX_FORM_CLEAR,
	VALUE_ADDED_TAX_FORM_CHANGE_MODE
} from '../types';

const fields = {code: '', name: '', description: ''};

const INITIAL_STATE = {values: fields, errors: {...fields}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case VALUE_ADDED_TAX_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case VALUE_ADDED_TAX_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case VALUE_ADDED_TAX_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case VALUE_ADDED_TAX_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case VALUE_ADDED_TAX_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case VALUE_ADDED_TAX_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;