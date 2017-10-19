import {
	COUNTRY_CHANGE_DETAIL,
	COUNTRY_CLEAR_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return {
		type: COUNTRY_CHANGE_DETAIL,
		payload: {detail, key}
	};
};

export const clearDetail = () => {
	return {
		type: COUNTRY_CLEAR_DETAIL,
		payload: false
	};
};