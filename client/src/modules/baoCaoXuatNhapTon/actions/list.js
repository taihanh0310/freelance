import {
	BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_SELECTED_DETAIL,
	BAO_CAO_XUAT_NHAP_TON_CLEAR_SELECTED_DETAIL,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD,
	BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        BAO_CAO_XUAT_NHAP_TON_CHANGE_SEARCH_LIST,
	BAO_CAO_XUAT_NHAP_TON_PUSH_LIST_CHILD,
	BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD, 
	BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}phieu-thu-chi?date_from=${date_from}&date_to=${date_to}&type=0`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const searchByCondition = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}xuat-nhap-ton/search`, {values})
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}xuat-nhap-ton/${selectedDetail.medicine_id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: BAO_CAO_XUAT_NHAP_TON_CHANGE_SELECTED_DETAIL, payload: detail});
                                        dispatch({type: BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: BAO_CAO_XUAT_NHAP_TON_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};