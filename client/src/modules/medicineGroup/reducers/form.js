import {
	MEDICINE_GROUP_CHANGE_DETAIL,
	MEDICINE_GROUP_CLEAR_DETAIL,
	MEDICINE_GROUP_FORM_CHANGE,
	MEDICINE_GROUP_FORM_VALIDATION,
	MEDICINE_GROUP_FORM_CLEAR,
	MEDICINE_GROUP_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', description: '', code: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MEDICINE_GROUP_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case MEDICINE_GROUP_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case MEDICINE_GROUP_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case MEDICINE_GROUP_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case MEDICINE_GROUP_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case MEDICINE_GROUP_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;