import {
	DRUG_STORE_CHANGE_LIST,
	DRUG_STORE_PUSH_LIST,
	DRUG_STORE_REMOVE_LIST,
	DRUG_STORE_UPDATE_LIST,
	DRUG_STORE_CHANGE_SEARCH_LIST,
	DRUG_STORE_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const drugStores = getState().drugStores;
		return new Promise((resolve, reject) => {
			if(drugStores.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}drug-stores`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: DRUG_STORE_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const drugStores = getState().drugStores;
		newObj.key = drugStores.listRoot.length;
		dispatch({
			type: DRUG_STORE_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {drugStore} = getState();
		dispatch({
			type: DRUG_STORE_REMOVE_LIST,
			payload: {key: drugStore.key, keyRoot: drugStore.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {drugStore} = getState();
		dispatch({
			type: DRUG_STORE_UPDATE_LIST,
			payload: {object, key: drugStore.key, keyRoot: drugStore.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: DRUG_STORE_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: DRUG_STORE_FILTER_LIST,
		payload: list
	};
};