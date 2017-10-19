import {
	QUAN_LY_CONG_NO_CHANGE_LIST,
	QUAN_LY_CONG_NO_CHANGE_SELECTED_DETAIL,
	QUAN_LY_CONG_NO_CLEAR_SELECTED_DETAIL,
	QUAN_LY_CONG_NO_CHANGE_LIST_CHILD,
	QUAN_LY_CONG_NO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        QUAN_LY_CONG_NO_CHANGE_SEARCH_LIST,
	QUAN_LY_CONG_NO_PUSH_LIST_CHILD,
	QUAN_LY_CONG_NO_CLEAR_LIST_CHILD, 
	QUAN_LY_CONG_NO_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}phieu-thu-chi?date_from=${date_from}&date_to=${date_to}&type=0`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: QUAN_LY_CONG_NO_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const searchByCondition = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}quan-ly-cong-no/search`, {values})
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: QUAN_LY_CONG_NO_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (values) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}quan-ly-cong-no/detail`,{values})
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: QUAN_LY_CONG_NO_CHANGE_SELECTED_DETAIL, payload: detail[0]});
                                        dispatch({type: QUAN_LY_CONG_NO_CHANGE_LIST_CHILD, payload: detail});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: QUAN_LY_CONG_NO_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: QUAN_LY_CONG_NO_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: QUAN_LY_CONG_NO_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: QUAN_LY_CONG_NO_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: QUAN_LY_CONG_NO_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: QUAN_LY_CONG_NO_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: QUAN_LY_CONG_NO_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};