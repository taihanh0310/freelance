import {
	MEDICINE_EXPIRE_FORM_CHANGE,
	MEDICINE_EXPIRE_FORM_VALIDATION,
	MEDICINE_EXPIRE_FORM_CLEAR,
	MEDICINE_EXPIRE_CHANGE_MODE
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: MEDICINE_EXPIRE_FORM_CHANGE,
		payload: {field, value}
	};
};

export const formValidation = (field, value) => {
	return {
		type: MEDICINE_EXPIRE_FORM_VALIDATION,
		payload: {field, value}
	};
};

export const formClear = () => {
	return {
		type: MEDICINE_EXPIRE_FORM_CLEAR,
		payload: false
	};
};

export const formChangeMode = (mode) => {
	return {
		type: MEDICINE_EXPIRE_CHANGE_MODE,
		payload: mode
	};
};

export const formAdd = (productInputForm, productInputDetail) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}product-input`, {productInputForm, productInputDetail})
				.then(response => {
					resolve(response.data);
					dispatch({type: 'ADD'});
				})
				.catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.add.message'), I18n.t('errors.add.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }});
                                });
			}, Config.TIMEOUT);
		});
	};
};

export const formDelete = (id) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.delete(`${Config.API_URL}product-input/${id}`)
				.then(response => {
					resolve();
					dispatch({type: 'DELETE'});
				})
				.catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.delete.message'), I18n.t('errors.delete.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }})
                                });
			}, Config.TIMEOUT);
		});
	};
};

export const formEdit = (productInputForm, productInputDetail) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.put(`${Config.API_URL}product-input/${productInputForm.id}`, {productInputForm, productInputDetail})
				.then(response => {
					resolve();
					dispatch({type: 'EDIT'});
				})
				.catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.update.message'), I18n.t('errors.update.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }})
                                });
			}, Config.TIMEOUT);
		});
	};
};