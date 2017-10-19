import {
	MEDICINE_CHANGE_LIST,
	MEDICINE_PUSH_LIST,
	MEDICINE_REMOVE_LIST,
	MEDICINE_UPDATE_LIST,
	MEDICINE_CHANGE_SEARCH_LIST,
	MEDICINE_CLEAR_SEARCH_LIST,
	MEDICINE_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}medicine`)
				.then(response => {
					resolve();
					let medicines = [];
					let medicineGroups = response.data.data;
					medicineGroups.map(mg => {
						mg.medicines.map((medicine, key) => {
							medicine.header = key;
							medicine.size = mg.medicines.length-key;
							medicine.group = {
								id: mg.id,
								name: mg.name
							};
							medicines.push(medicine);
						});
					});
					medicines.unshift(Config.EMPTY_ROW);
					dispatch({
						type: MEDICINE_CHANGE_LIST,
						payload: {listRoot: medicines, list: medicines}
					});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const loadListParams = (search) => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}medicine`)
				.then(response => {
					resolve();
					let medicines = [];
					let medicineGroups = response.data.data;
					medicineGroups.map(mg => {
						mg.medicines.map((medicine, key) => {
							medicine.header = key;
							medicine.size = mg.medicines.length-key;
							medicine.group = {
								id: mg.id,
								name: mg.name
							};
							medicines.push(medicine);
						});
					});
					medicines.unshift(Config.EMPTY_ROW);
					const list = Helper.GetListFilter(medicines, search);
					dispatch({
						type: MEDICINE_CHANGE_LIST,
						payload: {listRoot: medicines, list}
					});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const loadListNoPres = () => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}medicine/no-drug`)
				.then(response => {
					resolve();
					let medicines = [];
					let medicineGroups = response.data.data;
					medicineGroups.map(mg => {
						mg.medicines_no_prescription_drug.map((medicine, key) => {
							medicine.header = key;
							medicine.size = mg.medicines_no_prescription_drug.length-key;
							medicine.group = {
								id: mg.id,
								name: mg.name
							};
							medicines.push(medicine);
						});
					});
					medicines.unshift(Config.EMPTY_ROW);
					dispatch({
						type: MEDICINE_CHANGE_LIST,
						payload: {listRoot: medicines, list: medicines}
					});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const loadOnlyMedicine = () => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		return new Promise((resolve, reject) => {
			// if(medicines.listRoot.length === 0){
				setTimeout(() => {
					axios.post(`${Config.API_URL}medicine/fetchOnlyMedicine`)
					.then(response => {
						// console.log(response.data);
						resolve(response.data);
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: MEDICINE_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			// }else{
			// 	resolve();
			// 	Helper.PageUnblock();
			// }
		});
	};
};
/**
 * Thuoc theo don
 * @returns {Function}
 */
export const loadListPres = () => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}medicine/prescription_drug`)
				.then(response => {
					resolve();
					let medicines = [];
					let medicineGroups = response.data.data;
					medicineGroups.map(mg => {
						mg.medicines_prescription_drug.map((medicine, key) => {
							medicine.header = key;
							medicine.size = mg.medicines_prescription_drug.length-key;
							medicine.group = {
								id: mg.id,
								name: mg.name
							};
							medicines.push(medicine);
						});
					});
					medicines.unshift(Config.EMPTY_ROW);
					dispatch({
						type: MEDICINE_CHANGE_LIST,
						payload: {listRoot: medicines, list: medicines}
					});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const medicines = getState().medicines;
		newObj.key = medicines.listRoot.length;
		dispatch({
			type: MEDICINE_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {medicine} = getState();
		dispatch({
			type: MEDICINE_REMOVE_LIST,
			payload: {key: medicine.key, keyRoot: medicine.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {medicine} = getState();
		dispatch({
			type: MEDICINE_UPDATE_LIST,
			payload: {object, key: medicine.key, keyRoot: medicine.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: MEDICINE_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const clearSearchList = () => {
	return {
		type: MEDICINE_CLEAR_SEARCH_LIST,
		payload: false
	};
};

export const changeList = (list) => {
	return {
		type: MEDICINE_FILTER_LIST,
		payload: list
	};
};