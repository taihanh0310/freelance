import {
	MEDICINE_UPDATE_PRICE_CHANGE_DETAIL,
	MEDICINE_UPDATE_PRICE_CLEAR_DETAIL,
	MEDICINE_UPDATE_PRICE_FORM_CHANGE,
	MEDICINE_UPDATE_PRICE_FORM_VALIDATION,
	MEDICINE_UPDATE_PRICE_FORM_CLEAR,
	MEDICINE_UPDATE_PRICE_FORM_CHANGE_MODE
} from '../types';

const fields = {
    code: '', 
    medicine_update_price_date: '', 
    medicine_id: '', 
    medicine_group_id: '',
    input_price: '',
    wholesale_price: '', 
    retail_price: '', 
    listed_price: '', 
    description: '',
    new_input_price: '',
    new_wholesale_price: '',
    new_retail_price: '',
    new_listed_price: ''
}

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MEDICINE_UPDATE_PRICE_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1)
				return {...state, values: {...action.payload.detail}};
		case MEDICINE_UPDATE_PRICE_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case MEDICINE_UPDATE_PRICE_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case MEDICINE_UPDATE_PRICE_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case MEDICINE_UPDATE_PRICE_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case MEDICINE_UPDATE_PRICE_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;