import {
	BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_CHANGE,
	BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_CHANGE_MODE,
	BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_CLEAR,
	BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};