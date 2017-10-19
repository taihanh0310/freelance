import {
	BEGIN_LIABILITY_CHANGE_DETAIL,
	BEGIN_LIABILITY_CLEAR_DETAIL,
	BEGIN_LIABILITY_FORM_CHANGE,
	BEGIN_LIABILITY_FORM_VALIDATION,
	BEGIN_LIABILITY_FORM_CLEAR,
	BEGIN_LIABILITY_FORM_CHANGE_MODE
} from '../types';

const fields = {
    code: '', 
    position: 1, 
    name: '', 
    supplier_group_id: '', 
    phone: '', 
    fax: '', 
    email: '', 
    website: '', 
    tax_code: '', 
    is_customer: 0, 
    peole_contact: '', 
    description: '', 
    address: '',
    begin_liability_money: '',
}

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'begin_liability_money', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case BEGIN_LIABILITY_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case BEGIN_LIABILITY_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case BEGIN_LIABILITY_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case BEGIN_LIABILITY_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case BEGIN_LIABILITY_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case BEGIN_LIABILITY_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;