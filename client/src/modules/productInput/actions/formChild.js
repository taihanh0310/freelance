import {
	PRODUCT_INPUT_FORM_CHILD_CHANGE,
	PRODUCT_INPUT_FORM_CHILD_CHANGE_MODE,
	PRODUCT_INPUT_FORM_CHILD_CLEAR,
	PRODUCT_INPUT_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: PRODUCT_INPUT_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: PRODUCT_INPUT_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: PRODUCT_INPUT_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: PRODUCT_INPUT_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};