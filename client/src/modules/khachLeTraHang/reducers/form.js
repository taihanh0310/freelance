import {
	KHACH_LE_TRA_HANG_CHANGE_SELECTED_DETAIL,
	KHACH_LE_TRA_HANG_FORM_CHANGE,
	KHACH_LE_TRA_HANG_FORM_VALIDATION,
	KHACH_LE_TRA_HANG_FORM_CLEAR,
	KHACH_LE_TRA_HANG_CHANGE_MODE,
        KHACH_LE_TRA_HANG_CHANGE_CHANGE_DISABLED
} from '../types';

const fields = {
	code: '',
        khach_le_tra_hang_code: '',
	delivery_date: '',
        return_date: '',
	input_output_form_type_id: '',
	from_drug_store_id: '',
	retai_customer_id: '',
	begin_liability_money: 0,
        discount_rate: 0,
	total_discount_money: 0,
	description: '',
	total_money_before_discount: 0,
        total_vat_money: 0,
        delivery_total_money: ''
}

const INITIAL_STATE = {values: fields, 
	errors: {
                    ...fields, 
                    begin_liability_money: '', 
                    total_discount_money: '', 
                    total_money_before_discount: '', 
                    total_vat_money: '', 
                    delivery_total_money: '',
                    discount_rate: ''
                }, 
            mode: 'add',
            focus: 'code',
            disabled: ''
        };

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case KHACH_LE_TRA_HANG_CHANGE_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case KHACH_LE_TRA_HANG_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case KHACH_LE_TRA_HANG_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case KHACH_LE_TRA_HANG_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case KHACH_LE_TRA_HANG_CHANGE_MODE: // Change mode va change disabled cua button
                        var status = action.payload == 'add' ? '' : 'disabled';
			return {...state, mode: action.payload, disabled: status};
                case KHACH_LE_TRA_HANG_CHANGE_CHANGE_DISABLED:
			return {...state, disabled: action.payload};
	}
	return state;
};

module.exports = Reducer;