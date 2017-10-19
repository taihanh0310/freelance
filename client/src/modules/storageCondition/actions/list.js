import {
	STORAGE_CONDITION_CHANGE_LIST,
	STORAGE_CONDITION_PUSH_LIST,
	STORAGE_CONDITION_REMOVE_LIST,
	STORAGE_CONDITION_UPDATE_LIST,
	STORAGE_CONDITION_CHANGE_SEARCH_LIST,
	STORAGE_CONDITION_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const storageConditions = getState().storageConditions;
		return new Promise((resolve, reject) => {
			// if(storageConditions.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}stogare-condition`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: STORAGE_CONDITION_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			// }else{
			// 	resolve();
			// 	Helper.PageUnblock();
			// }
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const storageConditions = getState().storageConditions;
		newObj.key = storageConditions.listRoot.length;
		dispatch({
			type: STORAGE_CONDITION_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {storageCondition} = getState();
		dispatch({
			type: STORAGE_CONDITION_REMOVE_LIST,
			payload: {key: storageCondition.key, keyRoot: storageCondition.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {storageCondition} = getState();
		dispatch({
			type: STORAGE_CONDITION_UPDATE_LIST,
			payload: {object, key: storageCondition.key, keyRoot: storageCondition.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: STORAGE_CONDITION_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: STORAGE_CONDITION_FILTER_LIST,
		payload: list
	};
};