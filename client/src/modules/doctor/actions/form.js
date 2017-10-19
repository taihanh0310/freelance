import {
	DOCTOR_FORM_CHANGE,
	DOCTOR_FORM_VALIDATION,
	DOCTOR_FORM_CLEAR,
	DOCTOR_FORM_CHANGE_MODE
} from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
	return {
		type: DOCTOR_FORM_CHANGE,
		payload: {field, value}
	};
};

export const formValidation = (field, value) => {
	return {
		type: DOCTOR_FORM_VALIDATION,
		payload: {field, value}
	};
};

export const formClear = () => {
	return {
		type: DOCTOR_FORM_CLEAR,
		payload: false
	};
};

export const formChangeMode = (mode) => {
	return {
		type: DOCTOR_FORM_CHANGE_MODE,
		payload: mode
	};
};

export const formAdd = (values) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.post(`${Config.API_URL}doctors`, values)
				.then(response => {
					resolve(response.data);
					dispatch({type: 'ADD'});
				})
                                .catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.add.message'), I18n.t('errors.add.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }}
                                    );
				});
			}, Config.TIMEOUT);
		});
	};
};

export const formDelete = (id) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.delete(`${Config.API_URL}doctors/${id}`)
				.then(response => {
					resolve();
					dispatch({type: 'DELETE'});
				})
                                .catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.delete.message'), I18n.t('errors.delete.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }}
                                    );
				});
			}, Config.TIMEOUT);
		});
	};
};

export const formEdit = (values) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.put(`${Config.API_URL}doctors/${values.id}`, values)
				.then(response => {
					resolve();
					dispatch({type: 'EDIT'});
				})
                                .catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.update.message'), I18n.t('errors.update.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }}
                                    );
				});
			}, Config.TIMEOUT);
		});
	};
};

export const uploadAvatar = (file) => {
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
                                const formData = new FormData();
                                formData.append('doctor_avatar', file);
                                
				axios.post(`${Config.API_URL}file-upload/doctor`, formData)
				.then(response => {
                                    
					resolve(response);
					dispatch({type: 'UPLOAD'});
				})
                                .catch(error => {
                                    reject();
                                    toastr.error(I18n.t('errors.update.message'), I18n.t('errors.update.title'), {
                                            onclick: function() {
                                                    resolve();
                                            }}
                                    );
				});
			}, Config.TIMEOUT);
		});
	};
};