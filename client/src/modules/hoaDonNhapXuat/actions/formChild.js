import {
	HOA_DON_NHAP_XUAT_FORM_CHILD_CHANGE,
	HOA_DON_NHAP_XUAT_FORM_CHILD_CHANGE_MODE,
	HOA_DON_NHAP_XUAT_FORM_CHILD_CLEAR,
	HOA_DON_NHAP_XUAT_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: HOA_DON_NHAP_XUAT_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: HOA_DON_NHAP_XUAT_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: HOA_DON_NHAP_XUAT_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: HOA_DON_NHAP_XUAT_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};