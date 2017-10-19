import {
    PAYMENT_TYPE_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PAYMENT_TYPE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
	}
	return state;
};

module.exports = Reducer;