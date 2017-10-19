import {
	MEDICINE_EXPIRE_CHANGE_SELECTED_DETAIL,
	MEDICINE_EXPIRE_FORM_CHANGE,
	MEDICINE_EXPIRE_FORM_VALIDATION,
	MEDICINE_EXPIRE_FORM_CLEAR,
	MEDICINE_EXPIRE_CHANGE_MODE
} from '../types';

const fields = {
	warning_type: '',
	limit_warning: '',
	color_warning: '',
	medicine_group_id: '',
	pharmacy_warehouse_id: ''
}

const INITIAL_STATE = {values: fields, 
						mode: 'add', 
						focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MEDICINE_EXPIRE_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case MEDICINE_EXPIRE_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case MEDICINE_EXPIRE_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case MEDICINE_EXPIRE_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case MEDICINE_EXPIRE_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;