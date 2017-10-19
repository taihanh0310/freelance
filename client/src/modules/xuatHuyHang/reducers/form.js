import {
	XUAT_HUY_HANG_CHANGE_SELECTED_DETAIL,
	XUAT_HUY_HANG_FORM_CHANGE,
	XUAT_HUY_HANG_FORM_VALIDATION,
	XUAT_HUY_HANG_FORM_CLEAR,
	XUAT_HUY_HANG_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	delivery_date: '',
	input_output_form_type_id: '',
	from_drug_store_id: '',
	description: '',
	total_money_before_discount: 0,
	total_vat_money: 0,
	delivery_total_money: 0
}

const INITIAL_STATE = {values: fields, 
	errors: {...fields, type: '', delivery_total_money: '',total_vat_money: '',total_money_before_discount: ''}, 
mode: 'add', 
focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case XUAT_HUY_HANG_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case XUAT_HUY_HANG_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case XUAT_HUY_HANG_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case XUAT_HUY_HANG_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case XUAT_HUY_HANG_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;