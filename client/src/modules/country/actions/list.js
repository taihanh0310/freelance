import {
	COUNTRY_CHANGE_LIST,
	COUNTRY_PUSH_LIST,
	COUNTRY_REMOVE_LIST,
	COUNTRY_UPDATE_LIST,
	COUNTRY_CHANGE_SEARCH_LIST,
	COUNTRY_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const countries = getState().countries;
		return new Promise((resolve, reject) => {
			if(countries.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}countries`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: COUNTRY_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const countries = getState().countries;
		newObj.key = countries.listRoot.length;
		dispatch({
			type: COUNTRY_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {country} = getState();
		dispatch({
			type: COUNTRY_REMOVE_LIST,
			payload: {key: country.key, keyRoot: country.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {country} = getState();
		dispatch({
			type: COUNTRY_UPDATE_LIST,
			payload: {object, key: country.key, keyRoot: country.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: COUNTRY_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: COUNTRY_FILTER_LIST,
		payload: list
	};
};