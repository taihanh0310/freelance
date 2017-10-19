import {
	PRODUCER_CHANGE_LIST,
	PRODUCER_PUSH_LIST,
	PRODUCER_REMOVE_LIST,
	PRODUCER_UPDATE_LIST,
	PRODUCER_CHANGE_SEARCH_LIST,
	PRODUCER_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const producers = getState().producers;
		return new Promise((resolve, reject) => {
			// if(producers.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}producer`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: PRODUCER_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const producers = getState().producers;
		newObj.key = producers.listRoot.length;
		dispatch({
			type: PRODUCER_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {producer} = getState();
		dispatch({
			type: PRODUCER_REMOVE_LIST,
			payload: {key: producer.key, keyRoot: producer.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {producer} = getState();
		dispatch({
			type: PRODUCER_UPDATE_LIST,
			payload: {object, key: producer.key, keyRoot: producer.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: PRODUCER_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: PRODUCER_FILTER_LIST,
		payload: list
	};
};