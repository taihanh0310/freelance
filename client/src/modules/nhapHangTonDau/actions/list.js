import {
	NHAP_HANG_TON_DAU_CHANGE_LIST,
	NHAP_HANG_TON_DAU_CHANGE_SELECTED_DETAIL,
	NHAP_HANG_TON_DAU_CLEAR_SELECTED_DETAIL,
	NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD,
	NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	NHAP_HANG_TON_DAU_PUSH_LIST_CHILD,
	NHAP_HANG_TON_DAU_CLEAR_LIST_CHILD, 
	NHAP_HANG_TON_DAU_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}product-input?date_from=${date_from}&date_to=${date_to}&type=-1`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: NHAP_HANG_TON_DAU_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}product-input/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: NHAP_HANG_TON_DAU_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD, payload: detail.product_input_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: NHAP_HANG_TON_DAU_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: NHAP_HANG_TON_DAU_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: NHAP_HANG_TON_DAU_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: NHAP_HANG_TON_DAU_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: NHAP_HANG_TON_DAU_CHANGE_LIST_CHILD,
		payload: list
	};
};
