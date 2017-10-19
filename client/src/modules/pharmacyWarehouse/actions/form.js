import {
	PHARMACY_WAREHOUSE_FORM_CHANGE,
	PHARMACY_WAREHOUSE_FORM_VALIDATION,
	PHARMACY_WAREHOUSE_FORM_CLEAR,
	PHARMACY_WAREHOUSE_FORM_CHANGE_MODE
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: PHARMACY_WAREHOUSE_FORM_CHANGE,
		payload: {field, value}
	};
};

export const formValidation = (field, value) => {
	return {
		type: PHARMACY_WAREHOUSE_FORM_VALIDATION,
		payload: {field, value}
	};
};

export const formClear = () => {
	return {
		type: PHARMACY_WAREHOUSE_FORM_CLEAR,
		payload: false
	};
};

export const formChangeMode = (mode) => {
	return {
		type: PHARMACY_WAREHOUSE_FORM_CHANGE_MODE,
		payload: mode
	};
};

export const formAdd = (values) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}pharmacy-warehouse`, values)
				.then(response => {
					toastr.success(I18n.t('success.add.message'), I18n.t('success.add.title'));
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
				axios.delete(`${Config.API_URL}pharmacy-warehouse/${id}`)
				.then(response => {
					toastr.success(I18n.t('success.delete.message'), I18n.t('success.delete.title'));
                                        resolve();
					dispatch({type: 'DELETE'});
				})
				.catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.delete.message'), I18n.t('errors.delete.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }});
                                });
			}, Config.TIMEOUT);
		});
	};
};

export const formEdit = (values) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.put(`${Config.API_URL}pharmacy-warehouse/${values.id}`, values)
				.then(response => {
					toastr.success(I18n.t('success.update.message'), I18n.t('success.update.title'));
                                        resolve();
					dispatch({type: 'EDIT'});
				})
				.catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.update.message'), I18n.t('errors.update.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }});
                                });
			}, Config.TIMEOUT);
		});
	};
};