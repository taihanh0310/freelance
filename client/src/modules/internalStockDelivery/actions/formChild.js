import {
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE_MODE,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_CLEAR,
	INTERNAL_STOCK_DELIVERY_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: INTERNAL_STOCK_DELIVERY_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: INTERNAL_STOCK_DELIVERY_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: INTERNAL_STOCK_DELIVERY_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};