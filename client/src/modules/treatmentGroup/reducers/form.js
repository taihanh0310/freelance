import {
	TREATMENT_GROUP_CHANGE_DETAIL,
	TREATMENT_GROUP_CLEAR_DETAIL,
	TREATMENT_GROUP_FORM_CHANGE,
	TREATMENT_GROUP_FORM_VALIDATION,
	TREATMENT_GROUP_FORM_CLEAR,
	TREATMENT_GROUP_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', description: '', code: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case TREATMENT_GROUP_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case TREATMENT_GROUP_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case TREATMENT_GROUP_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case TREATMENT_GROUP_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case TREATMENT_GROUP_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case TREATMENT_GROUP_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;