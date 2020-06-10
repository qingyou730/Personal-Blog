var dbUtil = require('./DBUtil');

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var insertSql = "insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`)  value (?,?,?,?,?,?)";
    var param = [title, content, tags, views, ctime, utime];
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
function queryBlogByPage(page, pageSize, success) {
    var querySql = "select * from blog order by id desc limit ?, ?";
    var param = [page*pageSize, pageSize];
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
function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog";
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

function queryBlogById(id, success) {
    var querySql = "select * from blog where id = ?";
    var param = [id];
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

function addViews(id, success) {
    var querySql = "update blog set views = views + 1 where id = ?";
    var param = [id];
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
function queryAllBlog(success) {
    var querySql = "select * from blog order by id desc";
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
function queryHotBlog(size, success) {
    var querySql = "select * from blog order by views desc limit ?";
    var param = [size];
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
function queryBlogBySearch(search, success) {
    var querySql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    var params = [search, search];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogBySearchCount(search, success) {
    var sql = "select count(1) from blog where title like \"%?%\" or content like \"%?%\";";
    var params = [search, search];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogBySearchCount = queryBlogBySearchCount;
module.exports.insertBlog = insertBlog;
module.exports.queryHotBlog = queryHotBlog;
module.exports.addViews = addViews;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;



