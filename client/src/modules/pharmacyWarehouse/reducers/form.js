import {
	PHARMACY_WAREHOUSE_CHANGE_DETAIL,
	PHARMACY_WAREHOUSE_CLEAR_DETAIL,
	PHARMACY_WAREHOUSE_FORM_CHANGE,
	PHARMACY_WAREHOUSE_FORM_VALIDATION,
	PHARMACY_WAREHOUSE_FORM_CLEAR,
	PHARMACY_WAREHOUSE_FORM_CHANGE_MODE
} from '../types';

const fields = {
    code: '', 
    position: 1, 
    name: '', 
    warehouse_keeper_id: '', 
    phone_number: '', 
    address: '', 
    fax_number: '',
    is_main_pharmacies_warehouse: 0,
    description: '',
    email: '',
}

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PHARMACY_WAREHOUSE_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1){
                            const detail = $.extend({}, action.payload.detail);
                            delete detail.warehouse_keeper; // remove relation before push to server
				return {...state, values: {...detail}};
                            }
		case PHARMACY_WAREHOUSE_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case PHARMACY_WAREHOUSE_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case PHARMACY_WAREHOUSE_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case PHARMACY_WAREHOUSE_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case PHARMACY_WAREHOUSE_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;