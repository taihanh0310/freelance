import {
	UNIT_CHANGE_LIST,
	UNIT_PUSH_LIST,
	UNIT_REMOVE_LIST,
	UNIT_UPDATE_LIST,
	UNIT_CHANGE_SEARCH_LIST,
	UNIT_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const units = getState().units;
		return new Promise((resolve, reject) => {
			// if(units.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}unit`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: UNIT_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const units = getState().units;
		newObj.key = units.listRoot.length;
		dispatch({
			type: UNIT_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {unit} = getState();
		dispatch({
			type: UNIT_REMOVE_LIST,
			payload: {key: unit.key, keyRoot: unit.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {unit} = getState();
		dispatch({
			type: UNIT_UPDATE_LIST,
			payload: {object, key: unit.key, keyRoot: unit.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: UNIT_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: UNIT_FILTER_LIST,
		payload: list
	};
};