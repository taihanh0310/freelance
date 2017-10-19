import {
	SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_LIST,
	SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_SELECTED_DETAIL,
	SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_SELECTED_DETAIL,
	SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_LIST_CHILD,
	SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_SEARCH_LIST,
	SO_THEO_DOI_NHAP_XUAT_THUOC_PUSH_LIST_CHILD,
	SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_LIST_CHILD, 
	SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_LIST
} from '../types';

export const searchByCondition = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}so-theo-doi-xuat-nhap-thuoc`,{values})
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type:SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_LIST, payload: {listRoot: list, list}});
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
					dispatch({type:SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_SELECTED_DETAIL, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const clearListChild = () => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const clearList = () => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CLEAR_LIST,
		payload: false // du lieu tra ve cho reducer
	};
};

export const changeListChild = (list) => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type:SO_THEO_DOI_NHAP_XUAT_THUOC_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};