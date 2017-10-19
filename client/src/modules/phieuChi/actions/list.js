import {
	PHIEU_CHI_CHANGE_LIST,
	PHIEU_CHI_CHANGE_SELECTED_DETAIL,
	PHIEU_CHI_CLEAR_SELECTED_DETAIL,
	PHIEU_CHI_CHANGE_LIST_CHILD,
	PHIEU_CHI_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        PHIEU_CHI_CHANGE_SEARCH_LIST,
	PHIEU_CHI_PUSH_LIST_CHILD,
	PHIEU_CHI_CLEAR_LIST_CHILD, 
	PHIEU_CHI_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}phieu-thu-chi?date_from=${date_from}&date_to=${date_to}&type=0`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: PHIEU_CHI_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const searchByCondition = (date_from, date_to, keyword) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}phieu-thu-chi?date_from=${date_from}&date_to=${date_to}&type=0&keyword=${keyword}`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: PHIEU_CHI_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}phieu-thu-chi/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: PHIEU_CHI_CHANGE_SELECTED_DETAIL, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: PHIEU_CHI_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: PHIEU_CHI_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: PHIEU_CHI_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: PHIEU_CHI_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: PHIEU_CHI_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: PHIEU_CHI_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: PHIEU_CHI_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};