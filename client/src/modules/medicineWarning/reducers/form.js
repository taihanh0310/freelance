import {
	MEDICINE_WARNING_CHANGE_DETAIL,
	MEDICINE_WARNING_CLEAR_DETAIL,
	MEDICINE_WARNING_FORM_CHANGE,
	MEDICINE_WARNING_FORM_VALIDATION,
	MEDICINE_WARNING_FORM_CLEAR,
	MEDICINE_WARNING_FORM_CHANGE_MODE
} from '../types';

const fields = {warning_type: '', enable_mode: '', limit_warning: '', color_warning: '', warning_type_name: '', enable_mode_name: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'name', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MEDICINE_WARNING_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case MEDICINE_WARNING_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case MEDICINE_WARNING_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case MEDICINE_WARNING_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case MEDICINE_WARNING_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case MEDICINE_WARNING_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;