import {
    PAYMENT_TYPE_LIST
} from '../types';

export const paymentTypeList = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
			setTimeout(() => {
                axios.get(`${Config.API_URL}payment-type`)
                .then(response => {
                    resolve();
                    const list = response.data.data;
                    list.unshift(Config.EMPTY_ROW);
                    list.map((l, key) => {
                        l.key = key;
                    });
                    dispatch({type: PAYMENT_TYPE_LIST, payload: {listRoot: list, list}});
                });
            }, Config.TIMEOUT);
		});
    };
};