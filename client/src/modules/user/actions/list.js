import {
	USER_CHANGE_LIST,
	USER_PUSH_LIST,
	USER_REMOVE_LIST,
	USER_UPDATE_LIST,
	USER_CHANGE_SEARCH_LIST,
	USER_FILTER_LIST,
    CUSTOMER_CHANGE_LIST
} from '../types';

export const loadWareHouseKepperList = () => {
	return (dispatch, getState) => {
		const users = getState().users;
		return new Promise((resolve, reject) => {
			if(users.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}user/warehouse-keeper`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: USER_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			}else{
				resolve();
				Helper.PageUnblock();
			}
		});
	};
};

export const loadAllRetailCustomerAndCustomer = () => {
	return (dispatch, getState) => {
		const users = getState().users;
		return new Promise((resolve, reject) => {
                    setTimeout(() => {
                            axios.post(`${Config.API_URL}customers/get-all`, null)
                            .then(response => {
                                    resolve();
                                    const list = response.data.data;
                                    dispatch({type: CUSTOMER_CHANGE_LIST, payload: {listRoot: list, list}});
                            });
                    }, Config.TIMEOUT);
		});
	};
};

export const loadUserLogin = () => {
	return (dispatch, getState) => {
		const users = getState().users;
		return new Promise((resolve, reject) => {
			if(users.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}user/loginUser`)
					.then(response => {
						resolve();
						const list = response.data.data;
						dispatch({type: USER_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const users = getState().users;
		newObj.key = users.listRoot.length;
		dispatch({
			type: USER_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {user} = getState();
		dispatch({
			type: USER_REMOVE_LIST,
			payload: {key: user.key, keyRoot: user.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {user} = getState();
		dispatch({
			type: USER_UPDATE_LIST,
			payload: {object, key: user.key, keyRoot: user.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: USER_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: USER_FILTER_LIST,
		payload: list
	};
};