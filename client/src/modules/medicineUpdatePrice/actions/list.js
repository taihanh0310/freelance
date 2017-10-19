import {
	MEDICINE_UPDATE_PRICE_CHANGE_LIST,
	MEDICINE_UPDATE_PRICE_PUSH_LIST,
	MEDICINE_UPDATE_PRICE_REMOVE_LIST,
	MEDICINE_UPDATE_PRICE_UPDATE_LIST,
	MEDICINE_UPDATE_PRICE_CHANGE_SEARCH_LIST,
	MEDICINE_UPDATE_PRICE_FILTER_LIST
} from '../types';

export const loadList = () => {
	return (dispatch, getState) => {
		const medicineUpdatePrices = getState().medicineUpdatePrices;
		return new Promise((resolve, reject) => {
			if(medicineUpdatePrices.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}medicine-update-price`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: MEDICINE_UPDATE_PRICE_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const medicineUpdatePrices = getState().medicineUpdatePrices;
		newObj.key = medicineUpdatePrices.listRoot.length;
		dispatch({
			type: MEDICINE_UPDATE_PRICE_PUSH_LIST,
			payload: newObj
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: MEDICINE_UPDATE_PRICE_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: MEDICINE_UPDATE_PRICE_FILTER_LIST,
		payload: list
	};
};