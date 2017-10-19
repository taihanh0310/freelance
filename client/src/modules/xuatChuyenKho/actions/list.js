import {
	XUAT_CHUYEN_KHO_CHANGE_LIST,
	XUAT_CHUYEN_KHO_CHANGE_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_CLEAR_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD,
	XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD_SELECTED_DETAIL,
	XUAT_CHUYEN_KHO_PUSH_LIST_CHILD,
	XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD,
        XUAT_CHUYEN_KHO_FORM_CHILD_UPDATE_LIST
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}internal-stock-delivery?date_from=${date_from}&date_to=${date_to}&type=1`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: XUAT_CHUYEN_KHO_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}internal-stock-delivery/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: XUAT_CHUYEN_KHO_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD, payload: detail.internal_stock_delivery_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: XUAT_CHUYEN_KHO_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: XUAT_CHUYEN_KHO_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: XUAT_CHUYEN_KHO_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: XUAT_CHUYEN_KHO_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const updateListChild = (object) => {
        return (dispatch, getState) => {
		const {listChild} = getState();
		dispatch({
			type: XUAT_CHUYEN_KHO_FORM_CHILD_UPDATE_LIST,
			payload: {object, key: listChild.key, keyRoot: listChild.keyRoot}
		});
	};
};