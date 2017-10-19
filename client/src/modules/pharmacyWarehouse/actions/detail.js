import {
	PHARMACY_WAREHOUSE_CHANGE_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return (dispatch, getState) => {
		dispatch({
			type: PHARMACY_WAREHOUSE_CHANGE_DETAIL,
			payload: {detail, keyRoot: detail.key, key}
		});
	};
};