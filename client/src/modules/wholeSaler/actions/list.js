import {
	WHOLE_SALER_CHANGE_LIST,
	WHOLE_SALER_CHANGE_SELECTED_DETAIL,
	WHOLE_SALER_CLEAR_SELECTED_DETAIL,
	WHOLE_SALER_CHANGE_LIST_CHILD,
	WHOLE_SALER_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	WHOLE_SALER_PUSH_LIST_CHILD,
	WHOLE_SALER_CLEAR_LIST_CHILD,
        WHOLE_SALER_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}whole-saler?date_from=${date_from}&date_to=${date_to}`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: WHOLE_SALER_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}whole-saler/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: WHOLE_SALER_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: WHOLE_SALER_CHANGE_LIST_CHILD, payload: detail.whole_saler_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: WHOLE_SALER_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: WHOLE_SALER_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: WHOLE_SALER_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: WHOLE_SALER_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: WHOLE_SALER_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: WHOLE_SALER_CHANGE_LIST_CHILD,
		payload: list
	};
};