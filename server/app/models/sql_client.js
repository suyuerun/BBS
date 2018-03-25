"use strict";

let mysql;
let logger;

let sqlClient = function (config, setMysql, setLogger) {
    mysql = setMysql;
    
    if (setLogger) {
        logger = setLogger;
    }
    
    this._pool = mysql.createPool(config);
    this._queryId = 0;
    this.map = {};
};

sqlClient.prototype.beginTransaction = function () {
    let self = this;
    return new Promise(function (resolve, reject) {
        self._pool.getConnection(function (err, connection) {

            if (err) {
                err.dbFailed = true;
                logger.error('query [%d] error:%s', self._queryId, JSON.stringify(err));
                return reject(err);
            }
            connection.beginTransaction(function(err) {
                if (err) {
                    connection.release();
                    err.dbFailed = true;
                    logger.error('beginTransaction [%d] error:%s', ++self._queryId, JSON.stringify(err));
                    return reject(err);
                }
                self.map[self._queryId] = connection;
                resolve(self._queryId);
            })

        });
    });
};

sqlClient.prototype.commit = function (qid) {
    let self = this;
    return new Promise(function (resolve, reject) {
        if(!self.map[qid]){
            return reject();
        }
        self.map[qid].commit(function(err) {
            if (err) {
                return self.map[qid].rollback(function() {
                    logger.error('commit [%d] error:%s', qid, JSON.stringify(err));
                    self.map[qid].release();
                    self.map[qid] = undefined;
                    err.dbFailed = true;
                    return reject(err);
                });
            }
            self.map[qid].release();
            self.map[qid] = undefined;
            logger.debug('commit [%d] result: success!', qid);
            resolve();
        });
    });
};

sqlClient.prototype.rollback = function (qid) {
    let self = this;
    return new Promise(function (resolve, reject) {
        if(!self.map[qid]){
            return resolve();
        }

        self.map[qid].rollback(function() {
            self.map[qid].release();
            self.map[qid] = undefined;
            logger.debug('rollback [%d] result: success!', qid);
            resolve();
        });
    });
};

sqlClient.prototype.query = function (sql, args, qid) {
    let self = this;
    logger.debug('query [%d] sql: {%s}, args: {%s}', ++self._queryId, sql, JSON.stringify(args));
    if (!!self.map[qid]) {
        return new Promise(function (resolve, reject) {
            self.map[qid].query(sql, args, function (error, results) {

                if (error) {
                    error.dbFailed = true;
                    logger.error('query [%d] error:%s', self._queryId, JSON.stringify(error));
                    return self.map[qid].rollback(function() {
                        self.map[qid].release();
                        self.map[qid] = undefined;
                        return reject(error);
                    });
                }

                logger.debug('query [%d] result: %s', self._queryId, JSON.stringify(results));
                resolve(results);
            });
        });
    }

    return new Promise(function (resolve, reject) {
        self._pool.getConnection(function(err, connection) {
            if (err) {
                err.dbFailed = true;
                logger.error('query [%d] error:%s', self._queryId, JSON.stringify(err));
                return reject(err);
            }

            // Use the connection
            connection.query(sql, args, function (error, results) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    error.dbFailed = true;
                    logger.error('query [%d] error:%s', self._queryId, JSON.stringify(error));
                    return reject(error);
                }

                logger.debug('query [%d] result: %s', self._queryId, JSON.stringify(results));
                resolve(results);
            });
        });
    });
};

sqlClient.prototype.insert = sqlClient.prototype.query;
sqlClient.prototype.update = sqlClient.prototype.query;
sqlClient.prototype.delete = sqlClient.prototype.query;

sqlClient.prototype.shutdown = function () {
    if (!this._pool) {
        return;
    }

    this._pool.end(function (err) {
        // all connections in the pool have ended
        logger.error(err);
    });
};

sqlClient.shutdown = function () {
    sqlClient.prototype.shutdown();
};

module.exports = sqlClient;