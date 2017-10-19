import {
	RETAILER_CHANGE_LIST,
	RETAILER_CHANGE_SELECTED_DETAIL,
	RETAILER_CLEAR_SELECTED_DETAIL,
	RETAILER_CHANGE_LIST_CHILD,
	RETAILER_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	RETAILER_PUSH_LIST_CHILD,
	RETAILER_CLEAR_LIST_CHILD, 
	RETAILER_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        RETAILER_CHANGE_SEARCH_LIST
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}retailer?date_from=${date_from}&date_to=${date_to}&type=1`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: RETAILER_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const searchByCondition = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}retailer/search`, {values})
				.then(response => {
					resolve();
					const list = response.data.data;
					//dispatch({type: RETAILER_CHANGE_SEARCH_HOA_DON_LIST, payload: {listRoot: list, list}});
                                        dispatch({type: RETAILER_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}retailer/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: RETAILER_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: RETAILER_CHANGE_LIST_CHILD, payload: detail.retailer_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: RETAILER_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: RETAILER_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: RETAILER_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: RETAILER_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: RETAILER_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: RETAILER_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: RETAILER_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};