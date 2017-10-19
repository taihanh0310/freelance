import {
	XUAT_TRA_HANG_NCC_CHANGE_LIST,
	XUAT_TRA_HANG_NCC_CHANGE_SELECTED_DETAIL,
	XUAT_TRA_HANG_NCC_CLEAR_SELECTED_DETAIL,
	XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD,
	XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
	XUAT_TRA_HANG_NCC_PUSH_LIST_CHILD,
	XUAT_TRA_HANG_NCC_CLEAR_LIST_CHILD, 
	XUAT_TRA_HANG_NCC_CLEAR_LIST_CHILD_SELECTED_DETAIL,
        XUAT_TRA_HANG_NCC_CHANGE_SEARCH_LIST,
        XUAT_TRA_HANG_NCC_CHANGE_SEARCH_RESULT_LIST
} from '../types';

export const loadList = (date_from, date_to) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}xuat-tra-hang-ncc?date_from=${date_from}&date_to=${date_to}`)
				.then(response => {
					resolve();
					const list = response.data.data;
					dispatch({type: XUAT_TRA_HANG_NCC_CHANGE_LIST, payload: {listRoot: list, list}});
				});
			}, Config.TIMEOUT);
		});
	};
};

export const onSearchBill = (values) => {
    return (dispatch, getState) => {
	return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(`${Config.API_URL}product-input/search-medicine`, {values})
		.then(response => {
                    resolve();
			const list = response.data.data;
                        
			dispatch({type: XUAT_TRA_HANG_NCC_CHANGE_SEARCH_RESULT_LIST, payload: list});
                    });
		}, Config.TIMEOUT);
            });
    };
};

export const onClickSearchResultBill = (code) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}product-input/code/${code}`)
				.then(response => {
					resolve();
					let detail = response.data.data;
                                        if(detail == 'undefined' || detail.length == 0){
                                            // toast message
                                            toastr.error('Không tìm thấy hóa đơn nhập', 'Cảnh báo');
                                        }
                                        else{
                                            
                                            // remove some attribute
                                            delete detail.total_vat_money;
                                            delete detail.total_discount_money;
                                            delete detail.total_money_before_discount;
                                            delete detail.product_total_money;
                                            delete detail.discount_rate;
                                            
                                            dispatch({type: XUAT_TRA_HANG_NCC_CHANGE_SELECTED_DETAIL, payload: detail});
                                            dispatch({type: XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD, payload: detail.product_input_details});
                                        }
				}).catch(function(err){
                                    toastr.error('Không tìm thấy hóa đơn nhập', 'Cảnh báo');
                                });
			}, Config.TIMEOUT);
		});
	};
};



export const chooseSelectedDetail = (selectedDetail) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios.get(`${Config.API_URL}xuat-tra-hang-ncc/${selectedDetail.id}`)
				.then(response => {
					resolve();
					const detail = response.data.data;
					dispatch({type: XUAT_TRA_HANG_NCC_CHANGE_SELECTED_DETAIL, payload: detail});
					dispatch({type: XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD, payload: detail.product_input_details});
				});
			}, Config.TIMEOUT);
		});
	};	
};


export const clearSelectedDetail = () => {
	return {
		type: XUAT_TRA_HANG_NCC_CLEAR_SELECTED_DETAIL,
		payload: false
	};
};

export const chooseListChildSelectedDetail = (selectedDetail) => {
	return {
		type: XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD_SELECTED_DETAIL,
		payload: selectedDetail
	};
};

export const clearListChildSelectedDetail = () => {
	return {
		type: XUAT_TRA_HANG_NCC_CLEAR_LIST_CHILD_SELECTED_DETAIL,
		payload: false
	};
};

export const pushListChild = (detail) => {
	return {
		type: XUAT_TRA_HANG_NCC_PUSH_LIST_CHILD,
		payload: detail
	};
};

export const clearListChild = () => {
	return {
		type: XUAT_TRA_HANG_NCC_CLEAR_LIST_CHILD,
		payload: false
	};
};

export const changeListChild = (list) => {
	return {
		type: XUAT_TRA_HANG_NCC_CHANGE_LIST_CHILD,
		payload: list
	};
};

export const changeSearchList = (field, value) => {
    return {
        type: XUAT_TRA_HANG_NCC_CHANGE_SEARCH_LIST,
        payload: {field, value}
    };
};
