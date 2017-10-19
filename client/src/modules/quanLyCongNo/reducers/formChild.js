import {
	QUAN_LY_CONG_NO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	QUAN_LY_CONG_NO_FORM_CHILD_CHANGE,
	QUAN_LY_CONG_NO_FORM_CHILD_CHANGE_MODE,
	QUAN_LY_CONG_NO_FORM_CHILD_CLEAR,
	QUAN_LY_CONG_NO_FORM_CHILD_VALIDATION
} from '../types';

const fields = {
	medicine_id: '',
	medicine_name: '',
	shipment_no: '',
	unit_name: '',
	input_price: 0,
	total_price: 0,
	quantity: 0,
	inventory_number: 0,
	medicine_limited_date: '',
	medicine_barcode: '',
	tax_level_id: '',
	vat_tax_money: 0
}

const INITIAL_STATE = {values: fields, errors: {...fields, input_price: '', vat_tax_money: '',total_price: '', quantity: '',inventory_number: ''}, mode: 'add',focus: 'medicine_id'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case QUAN_LY_CONG_NO_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case QUAN_LY_CONG_NO_FORM_CHILD_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case QUAN_LY_CONG_NO_FORM_CHILD_CHANGE_MODE:
			return {...state, mode: action.payload};
		case QUAN_LY_CONG_NO_FORM_CHILD_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case QUAN_LY_CONG_NO_FORM_CHILD_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
	}
	return state;
};

module.exports = Reducer;