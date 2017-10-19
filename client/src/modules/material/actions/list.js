import {
	MATERIAL_CHANGE_LIST,
	MATERIAL_PUSH_LIST,
	MATERIAL_REMOVE_LIST,
	MATERIAL_UPDATE_LIST,
	MATERIAL_CHANGE_SEARCH_LIST,
	MATERIAL_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const materials = getState().materials;
		return new Promise((resolve, reject) => {
			// if(materials.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}material`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: MATERIAL_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const materials = getState().materials;
		newObj.key = materials.listRoot.length;
		dispatch({
			type: MATERIAL_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {material} = getState();
		dispatch({
			type: MATERIAL_REMOVE_LIST,
			payload: {key: material.key, keyRoot: material.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {material} = getState();
		dispatch({
			type: MATERIAL_UPDATE_LIST,
			payload: {object, key: material.key, keyRoot: material.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: MATERIAL_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: MATERIAL_FILTER_LIST,
		payload: list
	};
};