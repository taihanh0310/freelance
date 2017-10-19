import {
	PHARMACY_WAREHOUSE_CHANGE_LIST,
	PHARMACY_WAREHOUSE_PUSH_LIST,
	PHARMACY_WAREHOUSE_REMOVE_LIST,
	PHARMACY_WAREHOUSE_UPDATE_LIST,
	PHARMACY_WAREHOUSE_CHANGE_SEARCH_LIST,
	PHARMACY_WAREHOUSE_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const pharmacyWarehouses = getState().pharmacyWarehouses;
		return new Promise((resolve, reject) => {
				setTimeout(() => {
					axios.get(`${Config.API_URL}pharmacy-warehouse`)
					.then(response => {
//						console.log(response.data);
                                                resolve(response.data); // tra ve mot cai then ben promise
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: PHARMACY_WAREHOUSE_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
		});
	};
};

export const loadOnlyMainPharmacyWareHouse = () => {
    return (dispatch, getState) => {
        const pharmacyWarehouses = getState().pharmacyWarehouses;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${Config.API_URL}pharmacy-warehouse?type=1`)
                        .then(response => {
                            //resolve();// tuong duong ham void;
//                            console.log(response.data);
                            resolve(response.data); // tra ve mot cai then ben promise
                            const list = response.data.data;
                            list.unshift(Config.EMPTY_ROW);
                            list.map((l, key) => {
                                l.key = key;
                            });
                            dispatch({type: PHARMACY_WAREHOUSE_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const loadChildPharmacyWareHouse = () => {
    return (dispatch, getState) => {
        const pharmacyWarehouses = getState().pharmacyWarehouses;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${Config.API_URL}pharmacy-warehouse?type=0`)
                        .then(response => {
                            resolve();
                            const list = response.data.data;
                            list.unshift(Config.EMPTY_ROW);
                            list.map((l, key) => {
                                l.key = key;
                            });
                            dispatch({type: PHARMACY_WAREHOUSE_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const pharmacyWarehouses = getState().pharmacyWarehouses;
		newObj.key = pharmacyWarehouses.listRoot.length;
		dispatch({
			type: PHARMACY_WAREHOUSE_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {pharmacyWarehouse} = getState();
		dispatch({
			type: PHARMACY_WAREHOUSE_REMOVE_LIST,
			payload: {key: pharmacyWarehouse.key, keyRoot: pharmacyWarehouse.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {pharmacyWarehouse} = getState();
		dispatch({
			type: PHARMACY_WAREHOUSE_UPDATE_LIST,
			payload: {object, key: pharmacyWarehouse.key, keyRoot: pharmacyWarehouse.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: PHARMACY_WAREHOUSE_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: PHARMACY_WAREHOUSE_FILTER_LIST,
		payload: list
	};
};