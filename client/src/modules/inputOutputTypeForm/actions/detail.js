import {
	INPUT_OUTPUT_TYPE_FORM_CHANGE_DETAIL
} from '../types';

export const selectDetail = (detail, key) => {
	return (dispatch, getState) => {
		dispatch({
			type: INPUT_OUTPUT_TYPE_FORM_CHANGE_DETAIL,
			payload: {detail, keyRoot: detail.key, key}
		});
	};
};