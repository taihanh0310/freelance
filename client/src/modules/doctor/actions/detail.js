import {
	DOCTOR_CHANGE_DETAIL,
	DOCTOR_CLEAR_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return {
		type: DOCTOR_CHANGE_DETAIL,
		payload: {detail, key}
	};
};

export const clearDetail = () => {
	return {
		type: DOCTOR_CLEAR_DETAIL,
		payload: false
	};
};