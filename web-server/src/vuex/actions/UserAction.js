import {axPost, axGet} from '../../common/HttpBean'
import userStore from '../stores/UserStore'
import {changeLoginbean} from '../getters/UserGetter';
export function register(form,thisa){
		axPost('/api/users/register',form,function(res){
			//alert(res.data);
			if(res.data == 1){
				thisa.$Message.error('register wrong!');
				return;
			}else{
				thisa.$Message.info('register ok!');
				thisa.regOrloginBox = false;
				userStore.commit('changeLoginbean',res.data);	
        		thisa.loginbean = changeLoginbean(thisa);
			}
		},function(err){
			alert('registerErr:'+JSON.stringify(err)||err);
		});
};

export function login(form,thisa){
		axPost('/api/users/login',form,function(res){
			if(res.data == 1){
				thisa.$Message.error('account/password wrong');
				return;
			}else{
				thisa.$Message.info('login ok!');
				thisa.regOrloginBox = false;
				userStore.commit('changeLoginbean',res.data);
				alert('login:'+JSON.stringify(res.data));	
        		thisa.loginbean = changeLoginbean(thisa);
			}
			//alert(res.data);
			//userStore.commit('login',res.data);
		},function(err){
			alert('loginErr:'+JSON.stringify(err.message)||err.message);
		});
};

export function logout(thisa){
		axGet('/api/users/logout', null, function(res){
			if(res.data == 1){
				thisa.$Message.info('loginbean已删除');
				userStore.commit('changeLoginbean',null);	
				thisa.loginbean = null;
				return;
			}else{
			}
			//alert(res.data);
			//userStore.commit('login',res.data);
		},function(err){
			alert('loginErr:'+JSON.stringify(err)||err);
		});
};

export function autoGetLogin(thisa){
		axGet('/api/users/getLoginbean', null, function(res){
			if(res.data == 1){
				thisa.$Message.info('loginbean 未找到');
				return;
			}else{
				userStore.commit('changeLoginbean',res.data);	
				thisa.loginbean = changeLoginbean(thisa);
			}
			//alert(res.data);
			//userStore.commit('login',res.data);
		},function(err){
			alert('loginErr:'+JSON.stringify(err)||err);
		});
};

export async function getAllPostList(thisa){
	await axGet('/api/postList/getAllPostList', null, function(res){
		if(res.data == 1){
			thisa.$Message.info('暂时无数据');
			return;
		}else{
			console.log('post:'+JSON.stringify(res));
			thisa.postList = res.data;
		}
	},function(err){
		alert('loginErr:'+JSON.stringify(err)||err);
	});
};
