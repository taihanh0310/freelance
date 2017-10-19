import {
	COUNTRY_CHANGE_DETAIL,
	COUNTRY_CLEAR_DETAIL,
	COUNTRY_FORM_CHANGE,
	COUNTRY_FORM_VALIDATION,
	COUNTRY_FORM_CLEAR,
	COUNTRY_FORM_CHANGE_MODE
} from '../types';

const fields = {code: '', name: '', description: ''};

const INITIAL_STATE = {values: fields, errors: {...fields}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case COUNTRY_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case COUNTRY_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case COUNTRY_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case COUNTRY_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case COUNTRY_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case COUNTRY_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;