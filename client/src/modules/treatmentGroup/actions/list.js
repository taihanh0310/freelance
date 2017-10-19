import {
	TREATMENT_GROUP_CHANGE_LIST,
	TREATMENT_GROUP_PUSH_LIST,
	TREATMENT_GROUP_REMOVE_LIST,
	TREATMENT_GROUP_UPDATE_LIST,
	TREATMENT_GROUP_CHANGE_SEARCH_LIST,
	TREATMENT_GROUP_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const treatmentGroups = getState().treatmentGroups;
		return new Promise((resolve, reject) => {
			// if(treatmentGroups.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}treatment-group`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: TREATMENT_GROUP_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const treatmentGroups = getState().treatmentGroups;
		newObj.key = treatmentGroups.listRoot.length;
		dispatch({
			type: TREATMENT_GROUP_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {treatmentGroup} = getState();
		dispatch({
			type: TREATMENT_GROUP_REMOVE_LIST,
			payload: {key: treatmentGroup.key, keyRoot: treatmentGroup.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {treatmentGroup} = getState();
		dispatch({
			type: TREATMENT_GROUP_UPDATE_LIST,
			payload: {object, key: treatmentGroup.key, keyRoot: treatmentGroup.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: TREATMENT_GROUP_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: TREATMENT_GROUP_FILTER_LIST,
		payload: list
	};
};