var dbUtil = require('./DBUtil');

function insertTag(tag, ctime, utime, success) {
    var insertSql = "insert into tags (`tag`,`ctime`,`utime`)  value (?,?,?)";
    var param = [tag, ctime, utime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, param, function(error, result) {
        if(error == null) {
            success(result)
        }else{
            console.log(error);
        }
    });
    connection.end();
}
function queryTag(tag, success) {
    var insertSql = "select * from tags where tag = ?;";
    var param = [tag];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, param, function(error, result) {
        if(error == null) {
            success(result)
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryAllTags(success) {
    var insertSql = "select * from tags;";
    var param = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, param, function(error, result) {
        if(error == null) {
            success(result)
        }else{
            console.log(error);
        }
    });
    connection.end();
}
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTags = queryAllTags;
// module.exports.queryByTagCount = queryByTagCount;



