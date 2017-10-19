import {
	NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE,
	NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE_MODE,
	NHAP_HANG_TON_DAU_FORM_CHILD_CLEAR,
	NHAP_HANG_TON_DAU_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: NHAP_HANG_TON_DAU_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: NHAP_HANG_TON_DAU_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: NHAP_HANG_TON_DAU_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};