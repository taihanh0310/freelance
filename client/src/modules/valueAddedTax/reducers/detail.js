import {
	VALUE_ADDED_TAX_CHANGE_DETAIL
} from '../types';

const INITIAL_STATE = {detail: {}, keyRoot: 0, key: 0};

const Reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case VALUE_ADDED_TAX_CHANGE_DETAIL:
			return {...state, detail: {...action.payload.detail}, keyRoot: action.payload.keyRoot, key: action.payload.key};
	}
	return state;
};

module.exports = Reducer;