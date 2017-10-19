import {
	QUAN_LY_CONG_NO_CHANGE_SELECTED_DETAIL,
	QUAN_LY_CONG_NO_FORM_CHANGE,
	QUAN_LY_CONG_NO_FORM_VALIDATION,
	QUAN_LY_CONG_NO_FORM_CLEAR,
	QUAN_LY_CONG_NO_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	user_id: '',
	full_name: '',
	date_input: '',
	date_output: '',
	type: 0,
	supplier_id: '',
	supplier_name: '',
	total_money: 0,
	description: '',
}

const INITIAL_STATE = {values: fields, 
	errors: {...fields, type: '', total_money: ''}, 
mode: 'add', 
focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case QUAN_LY_CONG_NO_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case QUAN_LY_CONG_NO_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case QUAN_LY_CONG_NO_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case QUAN_LY_CONG_NO_FORM_CLEAR:
			// return {...state, ...INITIAL_STATE, mode: state.mode};
			return {...state, ...INITIAL_STATE, values: {...INITIAL_STATE.values, full_name:state.values.full_name}, mode: state.mode}
		case QUAN_LY_CONG_NO_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;