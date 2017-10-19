import {
	XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	XUAT_TRA_HANG_NCC_FORM_CHILD_CHANGE,
	XUAT_TRA_HANG_NCC_FORM_CHILD_CHANGE_MODE,
	XUAT_TRA_HANG_NCC_FORM_CHILD_CLEAR,
	XUAT_TRA_HANG_NCC_FORM_CHILD_VALIDATION
} from '../types';

const fields = {
	xuat_tra_hang_ncc_id: '',
	medicine_id: '',
	medicine_name: '',
	unit_name: '',
        shipment_no: '',
	quantity: 0,
	input_price: 0,
	wholesale_price: 0,
	retail_price: 0,
        medicine_barcode: '',
	medicine_created_date: '',
	medicine_limited_date: '',
        tax_level_id: '',
	vat_tax_money: 0,
	total_price: 0,
        country_name: '',
        storage_position_name: '',
        so_luong_tra: 0,
        thanh_tien_tra: 0,
        so_luong_con_lai: 0
}

const INITIAL_STATE = {
                        values: fields, 
                        errors: {
                                ...fields, 
                                quantity: '', 
                                input_price: '', 
                                wholesale_price: '', 
                                retail_price: '', 
                                vat_tax_money: '', 
                                total_price: '',
                                so_luong_tra: '',
                                thanh_tien_tra: '',
                                so_luong_con_lai: ''
                            }, 
                        mode: 'add',
                        focus: 'code'
                    };

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case XUAT_TRA_HANG_NCC_FORM_CHILD_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case XUAT_TRA_HANG_NCC_FORM_CHILD_CHANGE_MODE:
			return {...state, mode: action.payload};
		case XUAT_TRA_HANG_NCC_FORM_CHILD_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case XUAT_TRA_HANG_NCC_FORM_CHILD_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
	}
	return state;
};

module.exports = Reducer;