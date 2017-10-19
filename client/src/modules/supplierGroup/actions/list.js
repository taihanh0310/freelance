import {
	SUPPLIER_GROUP_CHANGE_LIST,
	SUPPLIER_GROUP_PUSH_LIST,
	SUPPLIER_GROUP_REMOVE_LIST,
	SUPPLIER_GROUP_UPDATE_LIST,
	SUPPLIER_GROUP_CHANGE_SEARCH_LIST,
	SUPPLIER_GROUP_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const supplierGroups = getState().supplierGroups;
		return new Promise((resolve, reject) => {
			if(supplierGroups.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}supplier-group?type=supplier`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: SUPPLIER_GROUP_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const supplierGroups = getState().supplierGroups;
		newObj.key = supplierGroups.listRoot.length;
		dispatch({
			type: SUPPLIER_GROUP_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {supplierGroup} = getState();
		dispatch({
			type: SUPPLIER_GROUP_REMOVE_LIST,
			payload: {key: supplierGroup.key, keyRoot: supplierGroup.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {supplierGroup} = getState();
		dispatch({
			type: SUPPLIER_GROUP_UPDATE_LIST,
			payload: {object, key: supplierGroup.key, keyRoot: supplierGroup.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: SUPPLIER_GROUP_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: SUPPLIER_GROUP_FILTER_LIST,
		payload: list
	};
};