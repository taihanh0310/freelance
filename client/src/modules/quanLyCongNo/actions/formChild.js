import {
	QUAN_LY_CONG_NO_FORM_CHILD_CHANGE,
	QUAN_LY_CONG_NO_FORM_CHILD_CHANGE_MODE,
	QUAN_LY_CONG_NO_FORM_CHILD_CLEAR,
	QUAN_LY_CONG_NO_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: QUAN_LY_CONG_NO_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: QUAN_LY_CONG_NO_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: QUAN_LY_CONG_NO_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: QUAN_LY_CONG_NO_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};