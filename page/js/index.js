let everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "第一天的内容"
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryEveryDay",
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content;
        }).catch(function () {
            console.log("请求失败");
        });
    },
});
let articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [{
            title: "",
            content: "",
            date: "",
            views: "",
            tags: "",
            id: "",
            link: ""
        }],
    },
    computed: {
        jumpTo: function () {
            return function (page) {
                this.getPage(page);
            }
        },
        getPage: function () {
            return function (page, pageSize = 5) {
                let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searchUrlParams[i].split("=")[1]
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                if (tag == "") {
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
                    }).then(function (resp) {
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function () {
                        console.log("请求失败");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount",
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                    }).catch(function () {
                        console.log("请求失败");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
                    }).then(function (resp) {
                        // console.log(resp)
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function () {
                        console.log("请求失败");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount",
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                    }).catch(function () {
                        console.log("请求失败");
                    });
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag,
                    }).then(function (resp) {
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function () {
                        console.log("请求失败");
                    });
                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag="+tag,
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                    }).catch(function () {
                        console.log("请求失败");
                    });
                }

                this.generatePageTool;
            }
        },
        generatePageTool: function () {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];
            result.push({
                text: "<<",
                page: 1
            });
            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                });
            }
            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                });
            }
            result.push({
                text: nowPage,
                page: nowPage
            });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                });
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                });
            }
            result.push({
                text: ">>",
                page: parseInt((totalCount + pageSize - 1) / pageSize)
            })
            this.pageNumList = result;
            return result;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)

    }
});