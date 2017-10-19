import {
	INPUT_OUTPUT_TYPE_FORM_CHANGE_DETAIL,
	INPUT_OUTPUT_TYPE_FORM_CLEAR_DETAIL,
	INPUT_OUTPUT_TYPE_FORM_FORM_CHANGE,
	INPUT_OUTPUT_TYPE_FORM_FORM_VALIDATION,
	INPUT_OUTPUT_TYPE_FORM_FORM_CLEAR,
	INPUT_OUTPUT_TYPE_FORM_FORM_CHANGE_MODE
} from '../types';

const fields = {
	name: '',
	description: '',
    type: 1
};

const INITIAL_STATE = {values: fields, errors: {...fields, position: '', type: ''}, focus: 'name', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case INPUT_OUTPUT_TYPE_FORM_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case INPUT_OUTPUT_TYPE_FORM_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case INPUT_OUTPUT_TYPE_FORM_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case INPUT_OUTPUT_TYPE_FORM_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case INPUT_OUTPUT_TYPE_FORM_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading, values: {...INITIAL_STATE.values, type: state.values.type}}; // Muon giu lai field nao thi thi except no ra 
		case INPUT_OUTPUT_TYPE_FORM_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;