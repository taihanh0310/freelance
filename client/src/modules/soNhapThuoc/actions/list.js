import {
	SO_NHAP_THUOC_CHANGE_LIST,
	SO_NHAP_THUOC_CHANGE_SELECTED_DETAIL,
	SO_NHAP_THUOC_CLEAR_SELECTED_DETAIL,
	SO_NHAP_THUOC_CHANGE_LIST_CHILD,
	SO_NHAP_THUOC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        SO_NHAP_THUOC_CHANGE_SEARCH_LIST,
	SO_NHAP_THUOC_PUSH_LIST_CHILD,
	SO_NHAP_THUOC_CLEAR_LIST_CHILD, 
	SO_NHAP_THUOC_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const searchByCondition = (date_from, date_to, keyword) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}so-nhap-thuoc?date_from=${date_from}&date_to=${date_to}&keyword=${keyword}`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: SO_NHAP_THUOC_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}so-nhap-thuoc/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: SO_NHAP_THUOC_CHANGE_SELECTED_DETAIL, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: SO_NHAP_THUOC_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: SO_NHAP_THUOC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: SO_NHAP_THUOC_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const clearListChild = () => {
	return {
		type: SO_NHAP_THUOC_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: SO_NHAP_THUOC_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: SO_NHAP_THUOC_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};