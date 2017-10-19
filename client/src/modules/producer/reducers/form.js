import {
	PRODUCER_CHANGE_DETAIL,
	PRODUCER_CLEAR_DETAIL,
	PRODUCER_FORM_CHANGE,
	PRODUCER_FORM_VALIDATION,
	PRODUCER_FORM_CLEAR,
	PRODUCER_FORM_CHANGE_MODE
} from '../types';

const fields = {code: '', name: '', email: '', address: '', phone: '', fax: '', website: '', description: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PRODUCER_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case PRODUCER_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case PRODUCER_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case PRODUCER_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case PRODUCER_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case PRODUCER_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;