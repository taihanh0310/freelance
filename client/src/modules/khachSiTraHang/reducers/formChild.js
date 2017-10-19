import {
	KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	KHACH_SI_TRA_HANG_FORM_CHILD_CHANGE,
	KHACH_SI_TRA_HANG_FORM_CHILD_CHANGE_MODE,
	KHACH_SI_TRA_HANG_FORM_CHILD_CLEAR,
	KHACH_SI_TRA_HANG_FORM_CHILD_VALIDATION
} from '../types';

const fields = {
	khach_si_tra_hang_id: '',
	total_price: 0,
	quantity: 0,
	inventory_number: 0,
        so_luong_tra: 0,
	so_luong_con_lai: 0,
	input_price: 0,
        gia_nhap: 0,
	medicine_id: '',
	medicine_name: '',
        unit_name: '',
	shipment_no: '',
	medicine_limited_date: '',
        medicine_barcode: '',
	tax_level_id: '',
	vat_tax_money: 0,
        discount_rate: 0,
        total_discount_money: 0,
        thanh_tien_tra: 0
}

const INITIAL_STATE = {
                        values: fields, 
                        errors: {
                                ...fields, 
                                total_price: '', 
                                quantity: '', 
                                inventory_number: '', 
                                so_luong_tra: '', 
                                so_luong_con_lai: '', 
                                input_price: '',
                                gia_nhap: '',
                                vat_tax_money: '',
                                discount_rate: '',
                                total_discount_money: '',
                                thanh_tien_tra: ''
                            }, 
                        mode: 'add',
                        focus: 'code'
                    };

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL:
			return {...state, values: {...action.payload}};
		case KHACH_SI_TRA_HANG_FORM_CHILD_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case KHACH_SI_TRA_HANG_FORM_CHILD_CHANGE_MODE:
			return {...state, mode: action.payload};
		case KHACH_SI_TRA_HANG_FORM_CHILD_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode};
		case KHACH_SI_TRA_HANG_FORM_CHILD_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
	}
	return state;
};

module.exports = Reducer;