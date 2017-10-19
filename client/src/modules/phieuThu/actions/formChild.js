import {
	PHIEU_THU_FORM_CHILD_CHANGE,
	PHIEU_THU_FORM_CHILD_CHANGE_MODE,
	PHIEU_THU_FORM_CHILD_CLEAR,
	PHIEU_THU_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: PHIEU_THU_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: PHIEU_THU_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: PHIEU_THU_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: PHIEU_THU_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};