import {
	HOA_DON_NHAP_XUAT_CHANGE_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_FORM_CHANGE,
	HOA_DON_NHAP_XUAT_FORM_VALIDATION,
	HOA_DON_NHAP_XUAT_FORM_CLEAR,
	HOA_DON_NHAP_XUAT_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	delivery_date: '',
	input_output_form_type_id: '',
	from_drug_store_id: '',
	retai_customer_id: '',
	discount_rate: 0,
	total_discount_money: 0,
	description: '',
	doctor_name: '',
	diagnostic: '',
	total_money_before_discount: 0,
	total_vat_money: 0,
	delivery_total_money: 0,
    type: 1
}

const INITIAL_STATE = {values: fields, 
	errors: {...fields, type: '', delivery_total_money: '',total_vat_money: '',discount_rate: '', total_discount_money: '',total_money_before_discount: ''}, 
mode: 'add', 
focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case HOA_DON_NHAP_XUAT_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case HOA_DON_NHAP_XUAT_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case HOA_DON_NHAP_XUAT_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case HOA_DON_NHAP_XUAT_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case HOA_DON_NHAP_XUAT_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;