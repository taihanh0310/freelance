import {
KHACH_SI_TRA_HANG_CHANGE_LIST,
        KHACH_SI_TRA_HANG_CHANGE_SELECTED_DETAIL,
        KHACH_SI_TRA_HANG_CLEAR_SELECTED_DETAIL,
        KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD,
        KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        KHACH_SI_TRA_HANG_PUSH_LIST_CHILD,
        KHACH_SI_TRA_HANG_CLEAR_LIST_CHILD,
        KHACH_SI_TRA_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        KHACH_SI_TRA_HANG_CHANGE_SEARCH_LIST,
        KHACH_SI_TRA_HANG_CHANGE_SEARCH_RESULT_SELECTED_DETAIL,
        KHACH_SI_TRA_HANG_CHANGE_SEARCH_RESULT_LIST
        } from '../types';

export const loadList = (date_from, date_to) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${Config.API_URL}khach-si-tra-hang?date_from=${date_from}&date_to=${date_to}`)
                        .then(response => {
                            resolve();
                            const list = response.data.data;
                            dispatch({type: KHACH_SI_TRA_HANG_CHANGE_LIST, payload: {listRoot: list, list}});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const onSearchBill = (values) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(`${Config.API_URL}whole-saler/search-medicine`, {values})
                        .then(response => {
                            resolve();
                            const list = response.data.data;

                            dispatch({type: KHACH_SI_TRA_HANG_CHANGE_SEARCH_RESULT_LIST, payload: list});
                        });
            }, Config.TIMEOUT);
        });
    };
};

export const onClickSearchResultBill = (code) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${Config.API_URL}whole-saler/code/${code}`)
                        .then(response => {
                            resolve();
                            let detail = response.data.data;
                            if (detail == 'undefined' || detail.length == 0) {
                                // toast message
                                toastr.error('Không tìm thấy hóa đơn bán sỉ', 'Cảnh báo');
                            } else {
                                // remove some attribute
                                delete detail.description;
                                delete detail.total_vat_money;
                                delete detail.total_discount_money;
                                delete detail.total_money_before_discount;
                                delete detail.delivery_total_money;
                                delete detail.discount_rate;

                                dispatch({type: KHACH_SI_TRA_HANG_CHANGE_SELECTED_DETAIL, payload: detail});
                                dispatch({type: KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD, payload: detail.whole_saler_details});
                            }
                        }).catch(function (err) {
                    toastr.error('Không tìm thấy hóa đơn bán sỉ', 'Cảnh báo');
                });
            }, Config.TIMEOUT);
        });
    };
};



export const chooseSelectedDetail = (selectedDetail) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${Config.API_URL}khach-si-tra-hang/${selectedDetail.id}`)
                        .then(response => {
                            resolve();
                            const detail = response.data.data;
                            dispatch({type: KHACH_SI_TRA_HANG_CHANGE_SELECTED_DETAIL, payload: detail});
                            dispatch({type: KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD, payload: detail.whole_saler_details});
                        });
            }, Config.TIMEOUT);
        });
    };
};


export const clearSelectedDetail = () => {
    return {
        type: KHACH_SI_TRA_HANG_CLEAR_SELECTED_DETAIL,
        payload: false
    };
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
    return {
        type: KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD_SELECTED_DETAIL,
        payload: selectedDetail
    };
};

export const clearListChildSelectedDetail = () => {
    return {
        type: KHACH_SI_TRA_HANG_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        payload: false
    };
};

export const pushListChild = (detail) => {
    return {
        type: KHACH_SI_TRA_HANG_PUSH_LIST_CHILD,
        payload: detail
    };
};

export const clearListChild = () => {
    return {
        type: KHACH_SI_TRA_HANG_CLEAR_LIST_CHILD,
        payload: false
    };
};

export const changeListChild = (list) => {
    return {
        type: KHACH_SI_TRA_HANG_CHANGE_LIST_CHILD,
        payload: list
    };
};

export const changeSearchList = (field, value) => {
    return {
        type: KHACH_SI_TRA_HANG_CHANGE_SEARCH_LIST,
        payload: {field, value}
    };
};
