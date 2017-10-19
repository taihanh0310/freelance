import {
	MEDICINE_GROUP_CHANGE_LIST,
	MEDICINE_GROUP_PUSH_LIST,
	MEDICINE_GROUP_REMOVE_LIST,
	MEDICINE_GROUP_UPDATE_LIST,
	MEDICINE_GROUP_CHANGE_SEARCH_LIST,
	MEDICINE_GROUP_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const medicineGroups = getState().medicineGroups;
		return new Promise((resolve, reject) => {
                    setTimeout(() => {
                            axios.get(`${Config.API_URL}medicine-group`)
                            .then(response => {
                                    resolve();
                                    const list = response.data.data;
                                    list.unshift(Config.EMPTY_ROW);
                                    list.map((l, key) => {
                                            l.key = key;
                                    });
                                    dispatch({type: MEDICINE_GROUP_CHANGE_LIST, payload: {listRoot: list, list}});
                            });
                    }, Config.TIMEOUT);
		});
	};
};

export const loadOnlyMedicineGroup = () => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		return new Promise((resolve, reject) => {
				setTimeout(() => {
					axios.post(`${Config.API_URL}medicine-group/fetchOnlyMedicineGroup`)
					.then(response => {
						resolve(response.data);
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: MEDICINE_GROUP_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const medicineGroups = getState().medicineGroups;
		newObj.key = medicineGroups.listRoot.length;
		dispatch({
			type: MEDICINE_GROUP_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {medicineGroup} = getState();
		dispatch({
			type: MEDICINE_GROUP_REMOVE_LIST,
			payload: {key: medicineGroup.key, keyRoot: medicineGroup.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {medicineGroup} = getState();
		dispatch({
			type: MEDICINE_GROUP_UPDATE_LIST,
			payload: {object, key: medicineGroup.key, keyRoot: medicineGroup.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: MEDICINE_GROUP_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: MEDICINE_GROUP_FILTER_LIST,
		payload: list
	};
};