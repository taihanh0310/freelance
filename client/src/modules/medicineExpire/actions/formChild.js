import {
	MEDICINE_EXPIRE_FORM_CHILD_CHANGE,
	MEDICINE_EXPIRE_FORM_CHILD_CHANGE_MODE,
	MEDICINE_EXPIRE_FORM_CHILD_CLEAR,
	MEDICINE_EXPIRE_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: MEDICINE_EXPIRE_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: MEDICINE_EXPIRE_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: MEDICINE_EXPIRE_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: MEDICINE_EXPIRE_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};