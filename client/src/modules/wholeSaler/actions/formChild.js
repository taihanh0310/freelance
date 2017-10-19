import {
	WHOLE_SALER_FORM_CHILD_CHANGE,
	WHOLE_SALER_FORM_CHILD_CHANGE_MODE,
	WHOLE_SALER_FORM_CHILD_CLEAR,
	WHOLE_SALER_FORM_CHILD_VALIDATION
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: WHOLE_SALER_FORM_CHILD_CHANGE,
		payload: {field, value}
	};
};

export const formChangeMode = (mode) => {
	return {
		type: WHOLE_SALER_FORM_CHILD_CHANGE_MODE,
		payload: mode
	};
};

export const formClear = () => {
	return {
		type: WHOLE_SALER_FORM_CHILD_CLEAR,
		payload: false
	};
};

export const formValidation = (field, value) => {
	return {
		type: WHOLE_SALER_FORM_CHILD_VALIDATION,
		payload: {field, value}
	};
};