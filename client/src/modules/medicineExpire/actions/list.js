import {
	MEDICINE_EXPIRE_CHANGE_LIST,
	MEDICINE_EXPIRE_CHANGE_SELECTED_DETAIL,
	MEDICINE_EXPIRE_CLEAR_SELECTED_DETAIL,
	MEDICINE_EXPIRE_CHANGE_LIST_CHILD,
	MEDICINE_EXPIRE_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	MEDICINE_EXPIRE_PUSH_LIST_CHILD,
	MEDICINE_EXPIRE_CLEAR_LIST_CHILD, 
	MEDICINE_EXPIRE_CLEAR_LIST_CHILD_SELECTED_DETAIL
} from '../types';

export const loadList = (condition) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}medicine/fetchThongTinThuocCoSoLuongSapHet`, {condition})
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: MEDICINE_EXPIRE_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const loadLimitDateList = (condition) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}medicine/fetchThongTinThuocSapHetHan`, {condition})
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: MEDICINE_EXPIRE_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}product-input/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: MEDICINE_EXPIRE_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: MEDICINE_EXPIRE_CHANGE_LIST_CHILD, payload: detail.MEDICINE_EXPIRE_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};

export const clearSelectedDetail = () => {
	return {
		type: MEDICINE_EXPIRE_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: MEDICINE_EXPIRE_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: MEDICINE_EXPIRE_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: MEDICINE_EXPIRE_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: MEDICINE_EXPIRE_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: MEDICINE_EXPIRE_CHANGE_LIST_CHILD,
		payload: list
	};
};
