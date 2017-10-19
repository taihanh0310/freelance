import {
	PRODUCER_CHANGE_DETAIL,
	PRODUCER_CLEAR_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return {
		type: PRODUCER_CHANGE_DETAIL,
		payload: {detail, key}
	};
};

export const clearDetail = () => {
	return {
		type: PRODUCER_CLEAR_DETAIL,
		payload: false
	};
};