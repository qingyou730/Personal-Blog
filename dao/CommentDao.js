var dbUtil = require('./DBUtil');

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
    var insertSql = "insert into comments (`blog_id`,`parent`, `parent_name`,`user_name`,`email`,`comments`,`ctime`,`utime`)  value (?,?,?,?,?,?,?,?)";
    var param = [blogId, parent, parentName, userName, email, comments, ctime, utime, success];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, param, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryCommentsByBlogId(blogId, success) {
    var querySql = "select * from comments where blog_id = ?;";
    var param = [blogId];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, param, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryCommentsCountByBlogId(blogId, success) {
    var querySql = "select count(1) as count from comments where blog_id = ?;";
    var param = [blogId];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, param, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryNewComments(size, success) {
    var insertSql = "select * from comments order by id desc limit ?;";
    var param = [size];
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
module.exports.queryNewComments=queryNewComments;
module.exports.insertComment=insertComment;
module.exports.queryCommentsByBlogId=queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId=queryCommentsCountByBlogId;

