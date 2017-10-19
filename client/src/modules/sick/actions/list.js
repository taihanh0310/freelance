import {
	SICK_CHANGE_LIST,
	SICK_PUSH_LIST,
	SICK_REMOVE_LIST,
	SICK_UPDATE_LIST,
	SICK_CHANGE_SEARCH_LIST,
	SICK_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const units = getState().units;
		return new Promise((resolve, reject) => {
			if(units.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}unit`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: SICK_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const units = getState().units;
		newObj.key = units.listRoot.length;
		dispatch({
			type: SICK_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {unit} = getState();
		dispatch({
			type: SICK_REMOVE_LIST,
			payload: {key: unit.key, keyRoot: unit.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {unit} = getState();
		dispatch({
			type: SICK_UPDATE_LIST,
			payload: {object, key: unit.key, keyRoot: unit.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: SICK_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: SICK_FILTER_LIST,
		payload: list
	};
};