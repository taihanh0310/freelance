const logger = store => next => action => {
	//const findForm = action.type.indexOf('Field');

	let result = next(action);
	//if(findForm === -1){
	//}

	return result;
}

export default logger;