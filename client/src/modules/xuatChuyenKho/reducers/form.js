import {
	XUAT_CHUYEN_KHO_CHANGE_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_FORM_CHANGE,
	XUAT_CHUYEN_KHO_FORM_VALIDATION,
	XUAT_CHUYEN_KHO_FORM_CLEAR,
	XUAT_CHUYEN_KHO_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	delivery_date: '',
	delivery_total_money: 0,
	description: '',
	discount_rate: 0,
	from_drug_store_id: '',
	input_output_form_type_id: '',
	to_drug_store_id: '',
	total_discount_money: 0,
	total_money_before_discount: 0,
        type:1
}

const INITIAL_STATE = {values: fields, 
	errors: {...fields, type: '', delivery_total_money: '', discount_rate: '', total_discount_money: '',total_money_before_discount: ''}, 
mode: 'add', 
focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case XUAT_CHUYEN_KHO_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case XUAT_CHUYEN_KHO_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case XUAT_CHUYEN_KHO_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case XUAT_CHUYEN_KHO_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case XUAT_CHUYEN_KHO_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;