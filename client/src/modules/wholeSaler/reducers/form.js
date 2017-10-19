import {
	WHOLE_SALER_CHANGE_SELECTED_DETAIL,
	WHOLE_SALER_FORM_CHANGE,
	WHOLE_SALER_FORM_VALIDATION,
	WHOLE_SALER_FORM_CLEAR,
	WHOLE_SALER_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	delivery_date: '',
	delivery_total_money: 0,
	description: '',
	discount_rate: 0,
	from_drug_store_id: '',
	input_output_form_type_id: '',
	customer_id: '',
    begin_liability_money: 0,
	total_discount_money: 0,
	total_money_before_discount: 0,
    total_vat_money: 0,
    payment_type_id: 1
};

const INITIAL_STATE = {
    values: fields,
	errors: {
        ...fields,
        begin_liability_money: '',
        delivery_total_money: '',
        discount_rate: '',
        total_discount_money: '',
        total_money_before_discount: '',
        total_vat_money: '',
        payment_type_id: ''
    },
    mode: 'add',
    focus: 'code'
};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case WHOLE_SALER_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case WHOLE_SALER_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case WHOLE_SALER_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case WHOLE_SALER_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case WHOLE_SALER_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;