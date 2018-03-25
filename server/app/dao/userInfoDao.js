var nodeUtil = require('util');
const TABLENAME = 'users';
var userInfoDao = module.exports;
var sqlClient = require('../models/sqlClient').getClient();

userInfoDao.getUserInfo = function (useName, passWord) {
    var sql = nodeUtil.format('select useName, passWord, nickName, createTime, updateTime, role, msgNum from %s where useName = ? and passWord = ? limit 1', TABLENAME);
    var args = [useName, passWord];
    return sqlClient.query(sql, args);
};
userInfoDao.addNewUser = function (useName, passWord, nickName, role, msgNum) {
    var sql = nodeUtil.format('insert into %s (useName, passWord, nickName, createTime, updateTime, role, msgNum) values (?, ?, ?, ?, ?, ?, ?)', TABLENAME);
    var createTime = new Date().getTime();
    var args = [useName, passWord, nickName, createTime, createTime, role, msgNum];
    return sqlClient.query(sql, args);
};
