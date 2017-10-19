import {
	INPUT_OUTPUT_TYPE_FORM_CHANGE_LIST,
	INPUT_OUTPUT_TYPE_FORM_PUSH_LIST,
	INPUT_OUTPUT_TYPE_FORM_REMOVE_LIST,
	INPUT_OUTPUT_TYPE_FORM_UPDATE_LIST,
	INPUT_OUTPUT_TYPE_FORM_CHANGE_SEARCH_LIST,
	INPUT_OUTPUT_TYPE_FORM_FILTER_LIST
} from '../types';

export const loadInputFormList = () => {
	return (dispatch, getState) => {
		const inputOutputTypeForms = getState().inputOutputTypeForms;
		return new Promise((resolve, reject) => {
			// if(inputOutputTypeForms.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}input-output-type-form?type=1`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: INPUT_OUTPUT_TYPE_FORM_CHANGE_LIST, payload: {listRoot: list, list}});
					});
				}, Config.TIMEOUT);
			// }else{
			// 	resolve();
			// 	Helper.PageUnblock();
			// }
		});
	};
};

export const loadOutputFormList = () => {
	return (dispatch, getState) => {
		const inputOutputTypeForms = getState().inputOutputTypeForms;
		return new Promise((resolve, reject) => {
			// if(inputOutputTypeForms.listRoot.length === 0){
				setTimeout(() => {
					axios.get(`${Config.API_URL}input-output-type-form?type=0`)
					.then(response => {
						resolve();
						const list = response.data.data;
						list.unshift(Config.EMPTY_ROW);
						list.map((l, key) => {
							l.key = key;
						});
						dispatch({type: INPUT_OUTPUT_TYPE_FORM_CHANGE_LIST, payload: {listRoot: list, list}});
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
		const inputOutputTypeForms = getState().inputOutputTypeForms;
		newObj.key = inputOutputTypeForms.listRoot.length;
		dispatch({
			type: INPUT_OUTPUT_TYPE_FORM_PUSH_LIST,
			payload: newObj
		});
	};
};

export const removeList = () => {
	return (dispatch, getState) => {
		const {inputOutputTypeForm} = getState();
		dispatch({
			type: INPUT_OUTPUT_TYPE_FORM_REMOVE_LIST,
			payload: {key: inputOutputTypeForm.key, keyRoot: inputOutputTypeForm.keyRoot}
		});
	};
};

export const updateList = (object) => {
	return (dispatch, getState) => {
		const {inputOutputTypeForm} = getState();
		dispatch({
			type: INPUT_OUTPUT_TYPE_FORM_UPDATE_LIST,
			payload: {object, key: inputOutputTypeForm.key, keyRoot: inputOutputTypeForm.keyRoot}
		});
	};
};

export const changeSearchList = (field, value) => {
	return {
		type: INPUT_OUTPUT_TYPE_FORM_CHANGE_SEARCH_LIST,
		payload: {field, value}
	};
};

export const changeList = (list) => {
	return {
		type: INPUT_OUTPUT_TYPE_FORM_FILTER_LIST,
		payload: list
	};
};