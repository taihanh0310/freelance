import {
	VALUE_ADDED_TAX_CHANGE_DETAIL,
	VALUE_ADDED_TAX_CLEAR_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return {
		type: VALUE_ADDED_TAX_CHANGE_DETAIL,
		payload: {detail, key}
	};
};

export const clearDetail = () => {
	return {
		type: VALUE_ADDED_TAX_CLEAR_DETAIL,
		payload: false
	};
};