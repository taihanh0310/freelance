import {
	BEGIN_LIABILITY_CHANGE_LIST,
	BEGIN_LIABILITY_PUSH_LIST,
	BEGIN_LIABILITY_REMOVE_LIST,
	BEGIN_LIABILITY_UPDATE_LIST,
	BEGIN_LIABILITY_CHANGE_SEARCH_LIST,
	BEGIN_LIABILITY_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const beginLiabilities = getState().beginLiabilities;
		return new Promise((resolve, reject) => {
				if(beginLiabilities.listRoot.length === 0){
                    setTimeout(() => {
                            axios.get(`${Config.API_URL}supplier?type=1`)
                            .then(response => {
                                    resolve();
                                    const list = response.data.data;
                                    list.unshift(Config.EMPTY_ROW);
                                    list.map((l, key) => {
                                            l.key = key;
                                    });
                                    dispatch({type: BEGIN_LIABILITY_CHANGE_LIST, payload: {listRoot: list, list}});
                            });
                    }, Config.TIMEOUT);
                }else{
					resolve();
					Helper.PageUnblock();
				}
		});
	};
};

export const loadListCustomer = () => {
	return (dispatch, getState) => {
		const beginLiabilities = getState().beginLiabilities;
		return new Promise((resolve, reject) => {
                setTimeout(() => {
                        axios.get(`${Config.API_URL}supplier?type=1`)
                        .then(response => {
                                resolve();
                                const list = response.data.data;
                                list.unshift(Config.EMPTY_ROW);
                                list.map((l, key) => {
                                        l.key = key;
                                });
                                dispatch({type: BEGIN_LIABILITY_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
                }, Config.TIMEOUT);
		});
	};
};

export const loadListSupplier = () => {
	return (dispatch, getState) => {
		const beginLiabilities = getState().beginLiabilities;
		return new Promise((resolve, reject) => {
                setTimeout(() => {
                        axios.get(`${Config.API_URL}supplier?type=0`)
                        .then(response => {
                                resolve();
                                const list = response.data.data;
                                list.unshift(Config.EMPTY_ROW);
                                list.map((l, key) => {
                                        l.key = key;
                                });
                                dispatch({type: BEGIN_LIABILITY_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
                }, Config.TIMEOUT);
		});
	};
};

export const pushList = (newObj) => {
	return (dispatch, getState) => {
		const beginLiabilities = getState().beginLiabilities;
		newObj.key = beginLiabilities.listRoot.length;
		dispatch({
			type: BEGIN_LIABILITY_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {beginLiability} = getState();
		dispatch({
			type: BEGIN_LIABILITY_REMOVE_LIST,
			payload: {key: beginLiability.key, keyRoot: beginLiability.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {beginLiability} = getState();
		dispatch({
			type: BEGIN_LIABILITY_UPDATE_LIST,
			payload: {object, key: beginLiability.key, keyRoot: beginLiability.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: BEGIN_LIABILITY_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: BEGIN_LIABILITY_FILTER_LIST,
		payload: list
	};
};