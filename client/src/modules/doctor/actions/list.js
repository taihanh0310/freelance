import {
	DOCTOR_CHANGE_LIST,
	DOCTOR_PUSH_LIST,
	DOCTOR_REMOVE_LIST,
	DOCTOR_UPDATE_LIST,
	DOCTOR_CHANGE_SEARCH_LIST,
	DOCTOR_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const doctors = getState().doctors;
		return new Promise((resolve, reject) => {
			// if(doctors.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}doctors`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: DOCTOR_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const doctors = getState().doctors;
		newObj.key = doctors.listRoot.length;
		dispatch({
			type: DOCTOR_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {doctor} = getState();
		dispatch({
			type: DOCTOR_REMOVE_LIST,
			payload: {key: doctor.key, keyRoot: doctor.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {doctor} = getState();
		dispatch({
			type: DOCTOR_UPDATE_LIST,
			payload: {object, key: doctor.key, keyRoot: doctor.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: DOCTOR_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: DOCTOR_FILTER_LIST,
		payload: list
	};
};