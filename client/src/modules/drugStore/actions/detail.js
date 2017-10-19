import {
	DRUG_STORE_CHANGE_DETAIL,
	DRUG_STORE_CLEAR_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return {
		type: DRUG_STORE_CHANGE_DETAIL,
		payload: {detail, key}
	};
};

export const clearDetail = () => {
	return {
		type: DRUG_STORE_CLEAR_DETAIL,
		payload: false
	};
};