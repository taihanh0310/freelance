import {
	VALUE_ADDED_TAX_CHANGE_LIST,
	VALUE_ADDED_TAX_PUSH_LIST,
	VALUE_ADDED_TAX_REMOVE_LIST,
	VALUE_ADDED_TAX_UPDATE_LIST,
	VALUE_ADDED_TAX_CHANGE_SEARCH_LIST,
	VALUE_ADDED_TAX_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const valuesAddedTax = getState().valuesAddedTax;
		return new Promise((resolve, reject) => {
			if(valuesAddedTax.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}value-added-tax`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: VALUE_ADDED_TAX_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			}else{
				resolve();
				Helper.PageUnblock();
			}
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const valuesAddedTax = getState().valuesAddedTax;
		newObj.key = valuesAddedTax.listRoot.length;
		dispatch({
			type: VALUE_ADDED_TAX_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {country} = getState();
		dispatch({
			type: VALUE_ADDED_TAX_REMOVE_LIST,
			payload: {key: country.key, keyRoot: country.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {country} = getState();
		dispatch({
			type: VALUE_ADDED_TAX_UPDATE_LIST,
			payload: {object, key: country.key, keyRoot: country.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: VALUE_ADDED_TAX_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: VALUE_ADDED_TAX_FILTER_LIST,
		payload: list
	};
};