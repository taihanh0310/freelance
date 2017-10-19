import {
	PRESCRIPTION_RETAIL_CHANGE_LIST,
	PRESCRIPTION_RETAIL_CHANGE_SELECTED_DETAIL,
	PRESCRIPTION_RETAIL_CLEAR_SELECTED_DETAIL,
	PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD,
	PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	PRESCRIPTION_RETAIL_PUSH_LIST_CHILD,
	PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD, 
	PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        PRESCRIPTION_RETAIL_CHANGE_SEARCH_LIST
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}retailer?date_from=${date_from}&date_to=${date_to}&type=0`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: PRESCRIPTION_RETAIL_CHANGE_LIST, payload: {listRoot: list, list}});
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
					//dispatch({type: PRESCRIPTION_RETAIL_CHANGE_SEARCH_HOA_DON_LIST, payload: {listRoot: list, list}});
                                        dispatch({type: PRESCRIPTION_RETAIL_CHANGE_LIST, payload: {listRoot: list, list}});
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
					dispatch({type: PRESCRIPTION_RETAIL_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD, payload: detail.retailer_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: PRESCRIPTION_RETAIL_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: PRESCRIPTION_RETAIL_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: PRESCRIPTION_RETAIL_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: PRESCRIPTION_RETAIL_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: PRESCRIPTION_RETAIL_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};