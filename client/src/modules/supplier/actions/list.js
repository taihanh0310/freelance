import {
	SUPPLIER_CHANGE_LIST,
	SUPPLIER_PUSH_LIST,
	SUPPLIER_REMOVE_LIST,
	SUPPLIER_UPDATE_LIST,
	SUPPLIER_CHANGE_SEARCH_LIST,
	SUPPLIER_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		return new Promise((resolve, reject) => {
//			if(suppliers.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}supplier`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: SUPPLIER_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
//			}else{
//				resolve();
//				Helper.PageUnblock();
//			}
		});
	};
};

export const loadSupplierList = () => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		return new Promise((resolve, reject) => {
//			if(suppliers.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}supplier?type=0`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: SUPPLIER_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
//			}else{
//				resolve();
//				Helper.PageUnblock();
//			}
		});
	};
};

export const loadCustomerList = () => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}supplier?type=1`)
				.then(response => {
					resolve();
					const list = response.data.data;
					list.unshift(Config.EMPTY_ROW);
					list.map((l, key) => {
						l.key = key;
					});
					dispatch({type: SUPPLIER_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		newObj.key = suppliers.listRoot.length;
		dispatch({
			type: SUPPLIER_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {supplier} = getState();
		dispatch({
			type: SUPPLIER_REMOVE_LIST,
			payload: {key: supplier.key, keyRoot: supplier.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {supplier} = getState();
		dispatch({
			type: SUPPLIER_UPDATE_LIST,
			payload: {object, key: supplier.key, keyRoot: supplier.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: SUPPLIER_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: SUPPLIER_FILTER_LIST,
		payload: list
	};
};