import {
	THUOC_DANG_DUOC_BAN_CHANGE_LIST,
	THUOC_DANG_DUOC_BAN_CHANGE_SELECTED_DETAIL,
	THUOC_DANG_DUOC_BAN_CLEAR_SELECTED_DETAIL,
	THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD,
	THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        THUOC_DANG_DUOC_BAN_CHANGE_SEARCH_LIST,
	THUOC_DANG_DUOC_BAN_PUSH_LIST_CHILD,
	THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD, 
	THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        THUOC_DANG_DUOC_BAN_CLEAR_LIST
} from '../types';

export const searchByCondition = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}thong-ke-thuoc-dang-duoc-ban`,{values})
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type:THUOC_DANG_DUOC_BAN_CHANGE_LIST, payload: {listRoot: list, list}});
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
					dispatch({type:THUOC_DANG_DUOC_BAN_CHANGE_SELECTED_DETAIL, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type:THUOC_DANG_DUOC_BAN_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type:THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type:THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const clearListChild = () => {
	return {
		type:THUOC_DANG_DUOC_BAN_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const clearList = () => {
	return {
		type:THUOC_DANG_DUOC_BAN_CLEAR_LIST,
		payload: false // du lieu tra ve cho reducer
	};
};

export const changeListChild = (list) => {
	return {
		type:THUOC_DANG_DUOC_BAN_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type:THUOC_DANG_DUOC_BAN_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};