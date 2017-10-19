import {
	CUSTOMER_CHANGE_LIST,
	CUSTOMER_PUSH_LIST,
	CUSTOMER_REMOVE_LIST,
	CUSTOMER_UPDATE_LIST,
	CUSTOMER_CHANGE_SEARCH_LIST,
	CUSTOMER_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		return new Promise((resolve, reject) => {
			//if(suppliers.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}customer`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: CUSTOMER_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			/*}else{
				resolve();
				Helper.PageUnblock();
			}*/
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		newObj.key = suppliers.listRoot.length;
		dispatch({
			type: CUSTOMER_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {supplier} = getState();
		dispatch({
			type: CUSTOMER_REMOVE_LIST,
			payload: {key: supplier.key, keyRoot: supplier.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {supplier} = getState();
		dispatch({
			type: CUSTOMER_UPDATE_LIST,
			payload: {object, key: supplier.key, keyRoot: supplier.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: CUSTOMER_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: CUSTOMER_FILTER_LIST,
		payload: list
	};
};