import {
	DOCTOR_CHANGE_DETAIL,
	DOCTOR_CLEAR_DETAIL,
	DOCTOR_FORM_CHANGE,
	DOCTOR_FORM_VALIDATION,
	DOCTOR_FORM_CLEAR,
	DOCTOR_FORM_CHANGE_MODE
} from '../types';

const fields = {
                code: '', 
                name: '', 
                address: '', 
                working_address: '', 
                phone_number: '', 
                position: '1',
                doctor_avatar: '',
                department_medicine_id: '',
                bank_number: ''
            };

const INITIAL_STATE = {values: fields, errors: {...fields, position: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case DOCTOR_CHANGE_DETAIL:
                        if(action.payload.detail.id !== -1){
                            const detail = $.extend({}, action.payload.detail);
                            delete detail.department_medicine; // remove relation before push to server
                            return {...state, values: {...detail}};
                        }
		case DOCTOR_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case DOCTOR_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case DOCTOR_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case DOCTOR_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case DOCTOR_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;