import {
	WHOLE_SALER_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	WHOLE_SALER_FORM_CHILD_CHANGE,
	WHOLE_SALER_FORM_CHILD_CHANGE_MODE,
	WHOLE_SALER_FORM_CHILD_CLEAR,
	WHOLE_SALER_FORM_CHILD_VALIDATION
} from '../types';

const fields = {
	medicine_id: '',
	medicine_name: '',
	shipment_no: '',
	unit_name: '',
	input_price: 0,
        gia_nhap: 0,
	total_price: 0,
	quantity: 0,
	inventory_number: 0,
	medicine_limited_date: '',
	medicine_barcode: '',
        discount_rate: 0,
        total_discount_money: 0,
        tax_level_id: '',
	vat_tax_money: 0
}

const INITIAL_STATE = {values: fields, errors: {...fields, gia_nhap: '', vat_tax_money: '', discount_rate: '',total_discount_money: '', input_price: '', total_price: '', quantity: '',inventory_number: ''}, mode: 'add',focus: 'medicine_id'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case WHOLE_SALER_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case WHOLE_SALER_FORM_CHILD_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case WHOLE_SALER_FORM_CHILD_CHANGE_MODE:
			return {...state, mode: action.payload};
		case WHOLE_SALER_FORM_CHILD_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case WHOLE_SALER_FORM_CHILD_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
	}
	return state;
};

module.exports = Reducer;