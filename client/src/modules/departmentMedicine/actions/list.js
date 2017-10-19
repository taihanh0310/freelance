import {
	DEPARTMENT_MEDICINE_CHANGE_LIST,
	DEPARTMENT_MEDICINE_PUSH_LIST,
	DEPARTMENT_MEDICINE_REMOVE_LIST,
	DEPARTMENT_MEDICINE_UPDATE_LIST,
	DEPARTMENT_MEDICINE_CHANGE_SEARCH_LIST,
	DEPARTMENT_MEDICINE_FILTER_LIST,
	DEPARTMENT_MEDICINE_CHANGE_DOCTORS,
	DEPARTMENT_MEDICINE_CLEAR_DOCTORS
} from '../types';

export const changeSelectedDoctors = (doctors) => {
	return {
		type: DEPARTMENT_MEDICINE_CHANGE_DOCTORS,
		payload: doctors
	}
}

export const clearSelectedDoctors = () => {
	return {
		type: DEPARTMENT_MEDICINE_CLEAR_DOCTORS,
		payload: false
	}
}

export const loadList = () => {
	return (dispatch, getState) => {
		const departmentMedicines = getState().departmentMedicines;
		return new Promise((resolve, reject) => {
			//if(departmentMedicines.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}department-medicines`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: DEPARTMENT_MEDICINE_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			/*}else{
				resolve();
				Helper.PageUnblock();
			}*/
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const departmentMedicines = getState().departmentMedicines;
		newObj.key = departmentMedicines.listRoot.length;
		dispatch({
			type: DEPARTMENT_MEDICINE_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {departmentMedicine} = getState();
		dispatch({
			type: DEPARTMENT_MEDICINE_REMOVE_LIST,
			payload: {key: departmentMedicine.key, keyRoot: departmentMedicine.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {departmentMedicine} = getState();
		dispatch({
			type: DEPARTMENT_MEDICINE_UPDATE_LIST,
			payload: {object, key: departmentMedicine.key, keyRoot: departmentMedicine.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: DEPARTMENT_MEDICINE_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: DEPARTMENT_MEDICINE_FILTER_LIST,
		payload: list
	};
};