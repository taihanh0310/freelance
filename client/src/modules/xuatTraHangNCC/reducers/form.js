import {
	XUAT_TRA_HANG_NCC_CHANGE_SELECTED_DETAIL,
	XUAT_TRA_HANG_NCC_FORM_CHANGE,
	XUAT_TRA_HANG_NCC_FORM_VALIDATION,
	XUAT_TRA_HANG_NCC_FORM_CLEAR,
	XUAT_TRA_HANG_NCC_CHANGE_MODE
} from '../types';

const fields = {
	code: '',
	date_input: '',
        delivery_date: '',
	input_output_form_type_id: '',
	pharmacy_warehouse_id: '',
	supplier_id: '',
	begin_liability_money: 0,
        description: '',
	discount_rate: 0,
	total_discount_money: 0,
	total_money_before_discount: 0,
        total_vat_money: 0,
        product_total_money: 0,
        xuat_tra_hang_ncc_code: ''
}

const INITIAL_STATE = {values: fields, 
	errors: {
                    ...fields, 
                    discount_rate: '', 
                    total_discount_money: '', 
                    total_money_before_discount: '', 
                    total_vat_money: '', 
                    product_total_money: '',
                    begin_liability_money: ''
                }, 
            mode: 'add',
            focus: 'code',
            disabled: ''
        };

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case XUAT_TRA_HANG_NCC_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case XUAT_TRA_HANG_NCC_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case XUAT_TRA_HANG_NCC_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case XUAT_TRA_HANG_NCC_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case XUAT_TRA_HANG_NCC_CHANGE_MODE:
			var status = action.payload == 'add' ? '' : 'disabled';
			return {...state, mode: action.payload, disabled: status};
	}
	return state;
};

module.exports = Reducer;