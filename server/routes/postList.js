var express = require('express');
var router = express.Router();
var postListDao = require('../app/dao/postListDao');

/* GET home page. */
router.get('/getAllPostList', function(req, res, next) {
    postListDao.getPostList().then(function (dbRes) {
        if(dbRes.length > 0){
          res.send(dbRes);
        }else{
          res.send('1');
        }
    });
});

module.exports = router;
