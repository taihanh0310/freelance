import {
	INTERNAL_STOCK_DELIVERY_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE_MODE,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_CLEAR,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_VALIDATION
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
        medicine_created_date: '',
	medicine_barcode: '', 
        country_id: '',
        country_name: ''
}

const INITIAL_STATE = {values: fields, errors: {...fields, input_price: '', total_price: '', quantity: '',inventory_number: ''}, mode: 'add',focus: 'medicine_id'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case INTERNAL_STOCK_DELIVERY_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE_MODE:
			return {...state, mode: action.payload};
		case INTERNAL_STOCK_DELIVERY_FORM_CHILD_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case INTERNAL_STOCK_DELIVERY_FORM_CHILD_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
	}
	return state;
};

module.exports = Reducer;