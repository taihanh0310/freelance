import {
	BAO_CAO_XUAT_NHAP_TON_CHANGE_SELECTED_DETAIL,
	BAO_CAO_XUAT_NHAP_TON_FORM_CHANGE,
	BAO_CAO_XUAT_NHAP_TON_FORM_VALIDATION,
	BAO_CAO_XUAT_NHAP_TON_FORM_CLEAR,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	user_id: '',
	full_name: '',
	date_input: '',
	date_output: '',
	type: 0,
	supplier_id: '',
	supplier_name: '',
	total_money: 0,
	description: '',
}

const INITIAL_STATE = {values: fields, 
	errors: {...fields, type: '', total_money: ''}, 
mode: 'add', 
focus: 'code'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case BAO_CAO_XUAT_NHAP_TON_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case BAO_CAO_XUAT_NHAP_TON_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case BAO_CAO_XUAT_NHAP_TON_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case BAO_CAO_XUAT_NHAP_TON_FORM_CLEAR:
			// return {...state, ...INITIAL_STATE, mode: state.mode};
			return {...state, ...INITIAL_STATE, values: {...INITIAL_STATE.values, full_name:state.values.full_name}, mode: state.mode}
		case BAO_CAO_XUAT_NHAP_TON_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;