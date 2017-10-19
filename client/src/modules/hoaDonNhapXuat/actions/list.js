import {
	HOA_DON_NHAP_XUAT_CHANGE_LIST,
	HOA_DON_NHAP_XUAT_CHANGE_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_CLEAR_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD,
	HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	HOA_DON_NHAP_XUAT_PUSH_LIST_CHILD,
	HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD, 
	HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}retailer?date_from=${date_from}&date_to=${date_to}&type=1`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: HOA_DON_NHAP_XUAT_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const searchByCondition = (date_from, date_to, keyword, type) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}hoa-don-nhap-xuat?date_from=${date_from}&date_to=${date_to}&type=0&keyword=${keyword}&type=${type}`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: HOA_DON_NHAP_XUAT_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}hoa-don-nhap-xuat/detail`, {selectedDetail})
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: HOA_DON_NHAP_XUAT_CHANGE_SELECTED_DETAIL, payload: selectedDetail});
					dispatch({type: HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: HOA_DON_NHAP_XUAT_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: HOA_DON_NHAP_XUAT_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: HOA_DON_NHAP_XUAT_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: HOA_DON_NHAP_XUAT_CHANGE_LIST_CHILD,
		payload: list
	};
};
