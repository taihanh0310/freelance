import {
	MEDICINE_CHANGE_DETAIL,
	MEDICINE_CLEAR_DETAIL,
	MEDICINE_FORM_CHANGE,
	MEDICINE_FORM_VALIDATION,
	MEDICINE_FORM_CLEAR,
	MEDICINE_FORM_CHANGE_MODE
} from '../types';

const fields = {
				medicine_group_id: '', 
				code: '', 
				input_price: '', 
				position: 1, 
				storage_position_id: '', 
				treatment_group_id: '', 
				wholesale_price: '', 
				day_warning: '', 
				retail_price: '', 
				number_warning: '', 
				name: '', 
				listed_price: '', 
				specification: '', 
				material_id: [], 
				max_number: '', 
				prescription_drug: 0, 
				producer_id: '', 
				min_number: '', 
				expiry: '', 
				storage_condition_id: '', 
				unit_parent_id: '', 
				unit_children_id: '', 
				coefficient: '', 
				keep_out_children: 0, 
				psychotropic_medicine: 0, 
				avoid_direct_sunlight: 0, 
				avoid_moisture: 0,
				no_registration: '', 
				dosage_form: '', 
				dosage: '', 
				company_registration: '', 
				medicine_information: '', 
				health_insurance: 0,
				materials: [],
				medicine_barcode: ''
			};

const productInputDetailsFields = {
	input_first_price: '',
	shipment_no: '',
	qr_code: '',
	medicine_limited_date: ''
};

const INITIAL_STATE = {
	valuesProductInputDetails: productInputDetailsFields, errors: productInputDetailsFields,
	values: fields, errors: {...fields, position: '', input_price: '', wholesale_price: '', day_warning: '', retail_price: '', number_warning: '', listed_price: '', max_number: '', prescription_drug: '', min_number: '', expiry: '', coefficient: '', keep_out_children: '', psychotropic_medicine: '', avoid_direct_sunlight: '', avoid_moisture: '', material_id: '', materials: '', health_insurance: ''}, focus: 'code', mode: 'edit'};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case MEDICINE_CHANGE_DETAIL:
			if(action.payload.detail.id !== -1){
                const detail = $.extend({}, action.payload.detail);
                //delete detail.materials; // remove relation before push to server
                return {...state, values: {...detail}};
            }
		case MEDICINE_CLEAR_DETAIL:
			return {...state, ...INITIAL_STATE};
		case MEDICINE_FORM_CHANGE:
			return {...state, values: {...state.values, [action.payload.field]: action.payload.value}};
		case MEDICINE_FORM_VALIDATION:
			return {...state, errors: {...state.errors, [action.payload.field]: action.payload.value}};
		case MEDICINE_FORM_CLEAR:
			return {...state, ...INITIAL_STATE, mode: state.mode, loading: state.loading};
		case MEDICINE_FORM_CHANGE_MODE:
			return {...state, mode: action.payload};
	}
	return state;
};

module.exports = Reducer;