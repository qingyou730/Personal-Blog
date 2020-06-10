var blogDayDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var CommentDao = require("../dao/CommentDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");

function queryAllTags(request, response) {
    tagsDao.queryAllTags(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}



function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        TagBlogMappingDao.queryByTagCount(result[0].id, function(result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
        })
    });
}
function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
        } else {
            TagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                var blogList = [];
                for (let i = 0; i < result.length; i++) {
                    blogDayDao.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0])
                    })
                }
                getResult(blogList, result.length, response);
            });
          
        }
    });
}

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 10)
    } else {
        for(var i = 0; i < blogList.length; i ++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/g, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", blogList));
        response.end();
    }
}
var path = new Map();
path.set("/queryAllTags", queryAllTags);
path.set("/queryByTag", queryByTag);
path.set("/queryByTagCount", queryByTagCount);



module.exports.path = path;