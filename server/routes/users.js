var express = require('express');
var router = express.Router();
var userInfoDao = require('../app/dao/userInfoDao');
/* GET users listing. */
router.get('/logout', function(req, res, next) {
    console.log(JSON.stringify(req.session.loginbean));
    delete req.session.loginbean;
  res.send('1');
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getLoginbean', function(req, res, next) {
    console.log(JSON.stringify(req.session.loginbean));
    if(!req.session.loginbean){
        return res.send('1')
    }
    res.send(req.session.loginbean);
});
router.post('/register', async function(req, res, next) {
    console.log('register:\n'+JSON.stringify(req.body));
    let userName = req.body.userNameValue;
    let passWord = req.body.passWordValue;
    let nickName = req.body.nickNameValue;
    try {
        await userInfoDao.addNewUser(userName, passWord, nickName, 1, 1, 0);
        return res.redirect(307, 'login')
    }catch (error){
        console.error('register:'+error||error.message);
        return res.send('1');
    }
    // return res.send('1');

});
router.post('/login', async function(req, res, next) {
  console.log('login ');
      var userName = req.body.userNameValue;
      var passWord = req.body.passWordValue;
      try{
          let dbRes = await userInfoDao.getUserInfo(userName, passWord);
          if(dbRes[0]){
              var loginbean = {
                  userName: dbRes[0].useName,
                  passWord: dbRes[0].passWord,
                  role: dbRes[0].role,
                  nickName:dbRes[0].nickName,
                  msgNum:dbRes[0].msgNum,
              };
              req.session.loginbean=loginbean;
          }
          console.log(JSON.stringify(loginbean));
          return res.send(loginbean);
      }catch (error){
          if(error){
              console.error('login:'+error||error.message);
              return res.send('1');
          }
      }

});


module.exports = router;
