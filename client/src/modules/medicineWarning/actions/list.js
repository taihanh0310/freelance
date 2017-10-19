import {
	MEDICINE_WARNING_CHANGE_LIST,
	MEDICINE_WARNING_PUSH_LIST,
	MEDICINE_WARNING_REMOVE_LIST,
	MEDICINE_WARNING_UPDATE_LIST,
	MEDICINE_WARNING_CHANGE_SEARCH_LIST,
	MEDICINE_WARNING_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const medicineWarnings = getState().medicineWarnings;
		return new Promise((resolve, reject) => {
				setTimeout(() => {
					axios.get(`${Config.API_URL}pharma-system-warning`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: MEDICINE_WARNING_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const units = getState().units;
		newObj.key = units.listRoot.length;
		dispatch({
			type: MEDICINE_WARNING_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {unit} = getState();
		dispatch({
			type: MEDICINE_WARNING_REMOVE_LIST,
			payload: {key: unit.key, keyRoot: unit.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {unit} = getState();
		dispatch({
			type: MEDICINE_WARNING_UPDATE_LIST,
			payload: {object, key: unit.key, keyRoot: unit.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: MEDICINE_WARNING_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: MEDICINE_WARNING_FILTER_LIST,
		payload: list
	};
};