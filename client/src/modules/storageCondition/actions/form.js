import {
	STORAGE_CONDITION_FORM_CHANGE,
	STORAGE_CONDITION_FORM_VALIDATION,
	STORAGE_CONDITION_FORM_CLEAR,
	STORAGE_CONDITION_FORM_CHANGE_MODE
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: STORAGE_CONDITION_FORM_CHANGE,
		payload: {field, value}
	};
};

export const formValidation = (field, value) => {
	return {
		type: STORAGE_CONDITION_FORM_VALIDATION,
		payload: {field, value}
	};
};

export const formClear = () => {
	return {
		type: STORAGE_CONDITION_FORM_CLEAR,
		payload: false
	};
};

export const formChangeMode = (mode) => {
	return {
		type: STORAGE_CONDITION_FORM_CHANGE_MODE,
		payload: mode
	};
};

export const formAdd = (values) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}stogare-condition`, values)
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
				axios.delete(`${Config.API_URL}stogare-condition/${id}`)
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
				axios.put(`${Config.API_URL}stogare-condition/${values.id}`, values)
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