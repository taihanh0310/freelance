import {
	RETAILER_CHANGE_SELECTED_DETAIL,
	RETAILER_FORM_CHANGE,
	RETAILER_FORM_VALIDATION,
	RETAILER_FORM_CLEAR,
	RETAILER_CHANGE_MODE
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
    type: 1,
    payment_type_id: 1
}

const INITIAL_STATE = {
    values: fields,
    errors: {
        ...fields,
        type: '',
        delivery_total_money: '',
        total_vat_money: '',
        discount_rate: '',
        total_discount_money: '',
        total_money_before_discount: '',
        payment_type_id: ''
    },
    mode: 'add',
    focus: 'code'
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case RETAILER_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case RETAILER_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case RETAILER_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case RETAILER_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case RETAILER_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;