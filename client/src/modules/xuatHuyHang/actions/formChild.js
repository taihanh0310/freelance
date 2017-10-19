import {
	XUAT_HUY_HANG_FORM_CHILD_CHANGE,
	XUAT_HUY_HANG_FORM_CHILD_CHANGE_MODE,
	XUAT_HUY_HANG_FORM_CHILD_CLEAR,
	XUAT_HUY_HANG_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: XUAT_HUY_HANG_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: XUAT_HUY_HANG_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: XUAT_HUY_HANG_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: XUAT_HUY_HANG_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};