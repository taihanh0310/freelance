import {
BAO_CAO_XUAT_HANG_CHANGE_LIST,
        BAO_CAO_XUAT_HANG_CHANGE_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CLEAR_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD,
        BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CHANGE_SEARCH_LIST,
        BAO_CAO_XUAT_HANG_PUSH_LIST_CHILD,
        BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD,
        BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        BAO_CAO_XUAT_HANG_CLEAR_LIST
        } from '../types';

export const searchByCondition = (values) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(`${Config.API_URL}bao-cao-xuat-hang-chi-tiet`, {values})
                        .then(response => {
                            resolve();
                            const list = response.data.data;
                            dispatch({type: BAO_CAO_XUAT_HANG_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const chooseSelectedDetail = (selectedDetail) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${Config.API_URL}bao-cao-xuat-hang-tong-hop/${selectedDetail.id}`)
                        .then(response => {
                            resolve();
                            const detail = response.data.data;
                            dispatch({type: BAO_CAO_XUAT_HANG_CHANGE_SELECTED_DETAIL, payload: detail});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const clearSelectedDetail = () => {
    return {
        type: BAO_CAO_XUAT_HANG_CLEAR_SELECTED_DETAIL,
        payload: false
    };
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
    return {
        type: BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        payload: selectedDetail
    };
};

export const clearListChildSelectedDetail = () => {
    return {
        type: BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        payload: false
    };
};

export const clearListChild = () => {
    return {
        type: BAO_CAO_XUAT_HANG_CLEAR_LIST_CHILD,
        payload: false
    };
};

export const clearList = () => {
    return {
        type: BAO_CAO_XUAT_HANG_CLEAR_LIST,
        payload: false // du lieu tra ve cho reducer
    };
};

export const changeListChild = (list) => {
    return {
        type: BAO_CAO_XUAT_HANG_CHANGE_LIST_CHILD,
        payload: list
    };
};

export const changeSearchList = (field, value) => {
    return {
        type: BAO_CAO_XUAT_HANG_CHANGE_SEARCH_LIST,
        payload: {field, value}
    };
};