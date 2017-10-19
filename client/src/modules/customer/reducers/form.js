import {
	CUSTOMER_CHANGE_DETAIL,
	CUSTOMER_CLEAR_DETAIL,
	CUSTOMER_FORM_CHANGE,
	CUSTOMER_FORM_VALIDATION,
	CUSTOMER_FORM_CLEAR,
	CUSTOMER_FORM_CHANGE_MODE
} from '../types';

const fields = {code: '', position: 1, name: '', supplier_group_id: '', phone_number: '', fax_number: '', email: '', tax_number: '', is_customer: 0, description: '', address: ''}

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case CUSTOMER_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case CUSTOMER_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case CUSTOMER_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case CUSTOMER_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case CUSTOMER_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case CUSTOMER_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;