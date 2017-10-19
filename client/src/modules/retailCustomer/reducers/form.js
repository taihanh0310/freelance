import {
	RETAIL_CUSTOMER_CHANGE_DETAIL,
	RETAIL_CUSTOMER_CLEAR_DETAIL,
	RETAIL_CUSTOMER_FORM_CHANGE,
	RETAIL_CUSTOMER_FORM_VALIDATION,
	RETAIL_CUSTOMER_FORM_CLEAR,
	RETAIL_CUSTOMER_FORM_CHANGE_MODE
} from '../types';

const fields = {
            code: '', 
            position: 1, 
            name: '', 
            phone_number: '', 
            address: '', 
            sex: 0,
            years_old: ''
        }

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'name', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case RETAIL_CUSTOMER_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case RETAIL_CUSTOMER_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case RETAIL_CUSTOMER_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case RETAIL_CUSTOMER_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case RETAIL_CUSTOMER_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case RETAIL_CUSTOMER_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;