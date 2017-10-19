import {
	CUSTOMER_CHANGE_LIST
} from '../types';

const INITIAL_STATE = {listRoot: [], list: [], load: false, search: {name: ''}};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case CUSTOMER_CHANGE_LIST:
			return {...state, listRoot: action.payload.listRoot, list: action.payload.list};
	}
	return state;
};

module.exports = Reducer;