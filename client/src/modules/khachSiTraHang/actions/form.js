import {
KHACH_SI_TRA_HANG_FORM_CHANGE,
        KHACH_SI_TRA_HANG_FORM_VALIDATION,
        KHACH_SI_TRA_HANG_FORM_CLEAR,
        KHACH_SI_TRA_HANG_CHANGE_MODE,
        KHACH_SI_TRA_HANG_CHANGE_CHANGE_DISABLED
        } from '../types';

const {Translate, I18n} = ReactReduxI18n;

export const formChange = (field, value) => {
    return {
        type: KHACH_SI_TRA_HANG_FORM_CHANGE,
        payload: {field, value}
    };
};

export const formValidation = (field, value) => {
    return {
        type: KHACH_SI_TRA_HANG_FORM_VALIDATION,
        payload: {field, value}
    };
};

export const formClear = () => {
    return {
        type: KHACH_SI_TRA_HANG_FORM_CLEAR,
        payload: false
    };
};

export const formChangeMode = (mode) => {
    return (dispatch) => {
        dispatch({type: KHACH_SI_TRA_HANG_CHANGE_MODE, payload: mode});
    }
};

export const formChangeDisabled = (disabled) => {
    return {
        type: KHACH_SI_TRA_HANG_CHANGE_CHANGE_DISABLED,
        payload: disabled
    };
};

export const formAdd = (khachSiTraHangForm, khachSiTraHangDetail) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(`${Config.API_URL}khach-si-tra-hang`, {khachSiTraHangForm, khachSiTraHangDetail})
                        .then(response => {
                            resolve(response.data);
                            dispatch({type: 'ADD'});
                        })
                        .catch(error => {
                            reject();
                            toastr.error(I18n.t('errors.add.message'), I18n.t('errors.add.title'), {
                                onclick: function () {
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
                axios.delete(`${Config.API_URL}khach-si-tra-hang/${id}`)
                        .then(response => {
                            resolve();
                            dispatch({type: 'DELETE'});
                        })
                        .catch(error => {
                            reject();
                            toastr.error(I18n.t('errors.delete.message'), I18n.t('errors.delete.title'), {
                                onclick: function () {
                                    resolve();
                                }})
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const formEdit = (khachSiTraHangForm, khachSiTraHangDetail) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.put(`${Config.API_URL}khach-si-tra-hang/${khachSiTraHangForm.id}`, {khachSiTraHangForm, khachSiTraHangDetail})
                        .then(response => {
                            resolve();
                            dispatch({type: 'EDIT'});
                        })
                        .catch(error => {
                            reject();
                            toastr.error(I18n.t('errors.update.message'), I18n.t('errors.update.title'), {
                                onclick: function () {
                                    resolve();
                                }})
                        });
            }, Config.TIMEOUT);
        });
    };
};