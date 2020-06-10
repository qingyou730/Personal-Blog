var blogDayDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function editBlog(request, response) {
    var param = url.parse(request.url, true).query;
    var tags = param.tags.replace(/ /g, "").replace("，", ",");
    request.on("data", function (data) {
        // title, content, tags, views, ctime, utime, success
        blogDayDao.insertBlog(param.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }

        });

    });
}

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            TagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
        }
    });
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagMapping(result.insertId, blogId)
    })
}

function insertTagMapping(tagId, blogId) {
    TagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {})
}

function queryBlogByPage(request, response) {
    var param = url.parse(request.url, true).query;
    blogDayDao.queryBlogByPage(parseInt(param.page), parseInt(param.pageSize), function (result) {
        for (var i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*>/g, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}

function queryBlogCount(request, response) {
    blogDayDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}

function queryBlogById(request, response) {
    var param = url.parse(request.url, true).query;
    blogDayDao.queryBlogById(param.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
        blogDayDao.addViews(param.bid, function (result) {})
    });
}

function queryAllBlog(request, response) {
    blogDayDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}

function queryHotBlog(request, response) {
    blogDayDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}

function queryBlogBySearch(request, response) {
    var params = url.parse(request.url, true).query;
    if (!params.search) {
        response.writeHead(400);
        response.end("must have be search");
        return;
    }
    blogDayDao.queryBlogBySearch(params.search, function (result) {
        blogDayDao.queryBlogBySearch(params.search, function (result) {
            blogDayDao.queryBlogBySearchCount(params.search, function (count) {
                response.writeHead(200);
                response.end(JSON.stringify({count: count, list: result}));
            });
        });
    });
}

path.set("/queryHotBlog", queryHotBlog);
path.set("/editBlog", editBlog);
path.set("/queryBlogByPage", queryBlogByPage);
path.set("/queryBlogCount", queryBlogCount);
path.set("/queryBlogById", queryBlogById);
path.set("/queryAllBlog", queryAllBlog);
path.set("/queryBlogBySearch", queryBlogBySearch);






module.exports.path = path;