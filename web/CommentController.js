var blogDayDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var CommentDao = require("../dao/CommentDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map();

function addComment(request, response) {
    var param = url.parse(request.url, true).query;
    // blogId, parent, userName, email, comments, ctime, utime, success
    // http://localhost:12306/addComment?bid=17&parent=-1&userName=qingou&email=web&content=
    CommentDao.insertComment(parseInt(param.bid), parseInt(param.parent), param.parentName, param.userName, param.email, param.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
    });
}

function queryRandomCode(request, response) {
    var img = captcha.create({
        fontSize: 50,
        width: 100,
        height: 34
    });
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "添加成功", img));
    response.end();
}
function queryCommentsByBlogId(request, response) {
    var param = url.parse(request.url, true).query;
    CommentDao.queryCommentsByBlogId(parseInt(param.bid), function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}
function queryCommentsCountByBlogId(request, response) {
    var param = url.parse(request.url, true).query;
    CommentDao.queryCommentsCountByBlogId(parseInt(param.bid), function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}
function queryNewComments(request, response) {
    CommentDao.queryNewComments(7, function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}
path.set("/addComment", addComment);
path.set("/queryNewComments", queryNewComments);
path.set("/queryRandomCode", queryRandomCode);
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

module.exports.path = path;