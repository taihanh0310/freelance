import {
LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST,
        LOI_NHUAN_THEO_MAT_HANG_CHANGE_SELECTED_DETAIL,
        LOI_NHUAN_THEO_MAT_HANG_CLEAR_SELECTED_DETAIL,
        LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST_CHILD,
        LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        LOI_NHUAN_THEO_MAT_HANG_CHANGE_SEARCH_LIST,
        LOI_NHUAN_THEO_MAT_HANG_PUSH_LIST_CHILD,
        LOI_NHUAN_THEO_MAT_HANG_CLEAR_LIST_CHILD,
        LOI_NHUAN_THEO_MAT_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        LOI_NHUAN_THEO_MAT_HANG_CLEAR_LIST
        } from '../types';

export const searchByCondition = (values) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(`${Config.API_URL}bao-cao-loi-nhuan-theo-mat-hang`, {values})
                        .then(response => {
                            resolve();
                            const list = response.data.data;
                            dispatch({type: LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const chooseSelectedDetail = (values) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(`${Config.API_URL}bao-cao-loi-nhuan-theo-mat-hang-chi-tiet`, {values})
                        .then(response => {
                            resolve();
                            const detail = response.data.data;
                            dispatch({type: LOI_NHUAN_THEO_MAT_HANG_CHANGE_SELECTED_DETAIL, payload: values});
                            dispatch({type: LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST_CHILD, payload: detail});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const clearSelectedDetail = () => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CLEAR_SELECTED_DETAIL,
        payload: false
    };
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        payload: selectedDetail
    };
};

export const clearListChildSelectedDetail = () => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        payload: false
    };
};

export const clearListChild = () => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CLEAR_LIST_CHILD,
        payload: false
    };
};

export const clearList = () => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CLEAR_LIST,
        payload: false // du lieu tra ve cho reducer
    };
};

export const changeListChild = (list) => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CHANGE_LIST_CHILD,
        payload: list
    };
};

export const changeSearchList = (field, value) => {
    return {
        type: LOI_NHUAN_THEO_MAT_HANG_CHANGE_SEARCH_LIST,
        payload: {field, value}
    };
};