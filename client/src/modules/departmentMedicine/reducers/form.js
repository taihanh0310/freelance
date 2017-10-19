import {
	DEPARTMENT_MEDICINE_CHANGE_DETAIL,
	DEPARTMENT_MEDICINE_CLEAR_DETAIL,
	DEPARTMENT_MEDICINE_FORM_CHANGE,
	DEPARTMENT_MEDICINE_FORM_VALIDATION,
	DEPARTMENT_MEDICINE_FORM_CLEAR,
	DEPARTMENT_MEDICINE_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', description: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'name', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case DEPARTMENT_MEDICINE_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1){
				const detail = $.extend({}, action.payload.detail);
				delete detail.doctors;
				//delete detail.doctors;
				return {...state, values: {...detail}};
			}
		case DEPARTMENT_MEDICINE_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case DEPARTMENT_MEDICINE_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case DEPARTMENT_MEDICINE_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case DEPARTMENT_MEDICINE_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case DEPARTMENT_MEDICINE_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;