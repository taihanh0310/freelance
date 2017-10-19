import {
	XUAT_HUY_HANG_CHANGE_LIST,
	XUAT_HUY_HANG_CHANGE_SELECTED_DETAIL,
	XUAT_HUY_HANG_CLEAR_SELECTED_DETAIL,
	XUAT_HUY_HANG_CHANGE_LIST_CHILD,
	XUAT_HUY_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	XUAT_HUY_HANG_PUSH_LIST_CHILD,
	XUAT_HUY_HANG_CLEAR_LIST_CHILD, 
	XUAT_HUY_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        XUAT_HUY_HANG_CHANGE_SEARCH_LIST
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}xuat-huy-hang?date_from=${date_from}&date_to=${date_to}`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: XUAT_HUY_HANG_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const searchByCondition = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}xuat-huy-hang/search`, {values})
				.then(response => {
					resolve();
					const list = response.data.data;
                                        dispatch({type: XUAT_HUY_HANG_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}xuat-huy-hang/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: XUAT_HUY_HANG_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: XUAT_HUY_HANG_CHANGE_LIST_CHILD, payload: detail.xuat_huy_hang_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: XUAT_HUY_HANG_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: XUAT_HUY_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: XUAT_HUY_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: XUAT_HUY_HANG_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: XUAT_HUY_HANG_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: XUAT_HUY_HANG_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: XUAT_HUY_HANG_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};