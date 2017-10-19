import {
	SUPPLIER_GROUP_CHANGE_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return (dispatch, getState) => {
		dispatch({
			type: SUPPLIER_GROUP_CHANGE_DETAIL,
			payload: {detail, keyRoot: detail.key, key}
		});
	};
};