import {
	RETAIL_CUSTOMER_CHANGE_LIST,
	RETAIL_CUSTOMER_PUSH_LIST,
	RETAIL_CUSTOMER_REMOVE_LIST,
	RETAIL_CUSTOMER_UPDATE_LIST,
	RETAIL_CUSTOMER_CHANGE_SEARCH_LIST,
	RETAIL_CUSTOMER_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const suppliers = getState().suppliers;
		return new Promise((resolve, reject) => {
                    setTimeout(() => {
                            axios.get(`${Config.API_URL}retail-customers`)
                            .then(response => {
                                    resolve();
                                    const list = response.data.data;
                                    list.unshift(Config.EMPTY_ROW);
                                    list.map((l, key) => {
                                            l.key = key;
                                    });
                                    dispatch({type: RETAIL_CUSTOMER_CHANGE_LIST, payload: {listRoot: list, list}});
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
			type: RETAIL_CUSTOMER_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {supplier} = getState();
		dispatch({
			type: RETAIL_CUSTOMER_REMOVE_LIST,
			payload: {key: supplier.key, keyRoot: supplier.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {supplier} = getState();
		dispatch({
			type: RETAIL_CUSTOMER_UPDATE_LIST,
			payload: {object, key: supplier.key, keyRoot: supplier.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: RETAIL_CUSTOMER_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: RETAIL_CUSTOMER_FILTER_LIST,
		payload: list
	};
};