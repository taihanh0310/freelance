import {
	MATERIAL_CHANGE_DETAIL,
	MATERIAL_CLEAR_DETAIL,
	MATERIAL_FORM_CHANGE,
	MATERIAL_FORM_VALIDATION,
	MATERIAL_FORM_CLEAR,
	MATERIAL_FORM_CHANGE_MODE
} from '../types';

const fields = {name: '', description: '', code: ''};

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'name', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MATERIAL_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case MATERIAL_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case MATERIAL_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case MATERIAL_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case MATERIAL_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case MATERIAL_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;