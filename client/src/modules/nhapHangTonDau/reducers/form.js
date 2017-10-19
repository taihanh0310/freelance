import {
	NHAP_HANG_TON_DAU_CHANGE_SELECTED_DETAIL,
	NHAP_HANG_TON_DAU_FORM_CHANGE,
	NHAP_HANG_TON_DAU_FORM_VALIDATION,
	NHAP_HANG_TON_DAU_FORM_CLEAR,
	NHAP_HANG_TON_DAU_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	date_input: '',
	input_output_form_type_id: '',
	pharmacy_warehouse_id: '',
	supplier_id: 0,
	begin_liability_money: 0,
	description: '',
	discount_rate: 0,
	total_discount_money: 0,
	total_vat_money: 0,
	product_total_money: 0,
	total_money_before_discount: 0
}

const INITIAL_STATE = {values: fields, 
	errors: {...fields, supplier_id: '', total_money_before_discount: '', begin_liability_money: '', discount_rate: '', total_discount_money: '', total_vat_money: '', product_total_money: ''}, 
mode: 'add', 
focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case NHAP_HANG_TON_DAU_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case NHAP_HANG_TON_DAU_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case NHAP_HANG_TON_DAU_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case NHAP_HANG_TON_DAU_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case NHAP_HANG_TON_DAU_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;