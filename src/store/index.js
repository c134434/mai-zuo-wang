import {createStore} from 'redux'

let reducer = function(state, action){
	if(state == null){
		state = {
			city: '深圳',
		};
	}
	
	if(action.type === 'changename'){
		state.city = action.val;
	} 
	return state;  
}

export default createStore(reducer);