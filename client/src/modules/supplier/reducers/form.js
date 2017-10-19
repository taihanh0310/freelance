import {
	SUPPLIER_CHANGE_DETAIL,
	SUPPLIER_CLEAR_DETAIL,
	SUPPLIER_FORM_CHANGE,
	SUPPLIER_FORM_VALIDATION,
	SUPPLIER_FORM_CLEAR,
	SUPPLIER_FORM_CHANGE_MODE
} from '../types';

const fields = {code: '', position: 1, name: '', supplier_group_id: '', phone: '', fax: '', email: '', website: '', tax_code: '', is_customer: 0, peole_contact: '', description: '', address: ''}

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case SUPPLIER_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case SUPPLIER_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case SUPPLIER_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case SUPPLIER_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case SUPPLIER_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case SUPPLIER_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;