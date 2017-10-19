import {
	NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE,
	NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE_MODE,
	NHAP_HANG_TON_DAU_FORM_CHILD_CLEAR,
	NHAP_HANG_TON_DAU_FORM_CHILD_VALIDATION
} from '../types';

const fields = {
	product_input_id: '',
	medicine_id: '',
	medicine_name: '',
	unit_id: '',
	unit_name: '',
	tax_level_id: '',
	country_id: '',
	quantity: 0,
	input_first_price: 0,
	input_price: 0,
	shipment_no: '',
	wholesale_price: 0,
	retail_price: 0,
	medicine_created_date: '',
	qr_code: '',
	medicine_limited_date: '',
	vat_tax_money: 0,
	total_price: 0,
	storage_position_id: '',
	storage_position_name: ''
}

const INITIAL_STATE = {values: fields, errors: {...fields, quantity: '', input_first_price: '', input_price: '', wholesale_price: '', retail_price: '', vat_tax_money: '', total_price: ''}, mode: 'add',focus: 'medicine_id'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE_MODE:
			return {...state, mode: action.payload};
		case NHAP_HANG_TON_DAU_FORM_CHILD_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case NHAP_HANG_TON_DAU_FORM_CHILD_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
	}
	return state;
};

module.exports = Reducer;