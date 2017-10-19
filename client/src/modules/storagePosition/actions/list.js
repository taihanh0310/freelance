import {
	STORAGE_POSITION_CHANGE_LIST,
	STORAGE_POSITION_PUSH_LIST,
	STORAGE_POSITION_REMOVE_LIST,
	STORAGE_POSITION_UPDATE_LIST,
	STORAGE_POSITION_CHANGE_SEARCH_LIST,
	STORAGE_POSITION_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const storagePositions = getState().storagePositions;
		return new Promise((resolve, reject) => {
			// if(storagePositions.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}stogare-position`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: STORAGE_POSITION_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const storagePositions = getState().storagePositions;
		newObj.key = storagePositions.listRoot.length;
		dispatch({
			type: STORAGE_POSITION_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {storagePosition} = getState();
		dispatch({
			type: STORAGE_POSITION_REMOVE_LIST,
			payload: {key: storagePosition.key, keyRoot: storagePosition.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {storagePosition} = getState();
		dispatch({
			type: STORAGE_POSITION_UPDATE_LIST,
			payload: {object, key: storagePosition.key, keyRoot: storagePosition.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: STORAGE_POSITION_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: STORAGE_POSITION_FILTER_LIST,
		payload: list
	};
};