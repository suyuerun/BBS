var Sequelize = require('sequelize');
var sequelize =require('./ModelHeader')();

var UserModel = sequelize.define('users', {
    uid: {type:Sequelize.BIGINT,primaryKey: true},
    useName: Sequelize.STRING,
    passWord: Sequelize.STRING,
    nickName: Sequelize.STRING,
    createTime:Sequelize.DATE,
    updateTime:Sequelize.DATE,
    role:Sequelize.INTEGER,
    msgNum:Sequelize.INTEGER
},{
    timestamps: false,
    paranoid: true  //获取不到id的返回值
});

module.exports = UserModel;