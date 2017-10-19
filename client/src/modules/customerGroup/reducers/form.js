import {
	CUSTOMER_GROUP_CHANGE_DETAIL,
	CUSTOMER_GROUP_CLEAR_DETAIL,
	CUSTOMER_GROUP_FORM_CHANGE,
	CUSTOMER_GROUP_FORM_VALIDATION,
	CUSTOMER_GROUP_FORM_CLEAR,
	CUSTOMER_GROUP_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', position: 1, description: '', import_discount: '', export_discount: '', code: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case CUSTOMER_GROUP_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case CUSTOMER_GROUP_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case CUSTOMER_GROUP_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case CUSTOMER_GROUP_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case CUSTOMER_GROUP_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case CUSTOMER_GROUP_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;