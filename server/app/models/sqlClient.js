var MysqlClient = require('./sql_client');
var sqlClient = (function () {

    var instance;
    function init() {
        // 私有方法和变量
        return new MysqlClient(require('./mysql_config').mysql_config, require('mysql'), require('pomelo-logger').getLogger('mysql'));
    }

    return {

        // 如果存在获取此单例实例，如果不存在创建一个单例实例
        getClient: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();

module.exports = sqlClient;