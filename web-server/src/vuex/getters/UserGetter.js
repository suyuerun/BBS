import userStore from '../stores/UserStore'
export function getRegister(vuea){
	//默认传入所在的vue对象
	//alert(note.state.name);
	alert('loginbean值发生改变 = ' + JSON.stringify(userStore.state.loginbean));
	return userStore.state.loginbean;
}
export function getLogin(vuea){
	//默认传入所在的vue对象
	//alert(note.state.name);
	alert('loginbean值发生改变 = ' + JSON.stringify(userStore.state.loginbean));
	return userStore.state.loginbean;
}
export function changeLoginbean(vuea){
	//默认传入所在的vue对象
	//alert(note.state.name);
	// alert('loginbean值发生改变 = ' + JSON.stringify(userStore.state.loginbean));
	return userStore.state.loginbean;
}