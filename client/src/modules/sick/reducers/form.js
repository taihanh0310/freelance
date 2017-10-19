import {
	SICK_CHANGE_DETAIL,
	SICK_CLEAR_DETAIL,
	SICK_FORM_CHANGE,
	SICK_FORM_VALIDATION,
	SICK_FORM_CLEAR,
	SICK_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', alias: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'name', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case SICK_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case SICK_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case SICK_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case SICK_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case SICK_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case SICK_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;