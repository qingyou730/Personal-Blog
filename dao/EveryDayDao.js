var dbUtil = require('./DBUtil');

function insertEveryDay(content, ctime, success) {
    var insertSql = "insert into every_day (`content`, `ctime`)  value (?, ?)";
    var param = [content, ctime];
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
function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1;";
    var param = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, param, function(error, result) {
        if(error == null) {
            success(result)
        }else{
            console.log(error);
        }
    });
    connection.end();
}
module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
