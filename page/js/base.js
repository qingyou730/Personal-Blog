var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: [],
        active: "first"
    },
    computed: {
        randomColor: function() {
            return function() {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb("+ red +", "+ green +", "+ blue +")";
            }
        },
        randomSize: function() {
            return function() {
                return (15 + Math.floor(Math.random() * 12)) + "px";
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryAllTags"
        }).then(function(resp) {
            var result = [];
            for(let i = 0; i < resp.data.data.length; i++) {
                result.push({text: resp.data.data[i].tag, link: "/?tag="+resp.data.data[i].tag})
            }
            result.sort(function() {
                return Math.random > 0.5 ? true : false;
            });
            randomTags.tags=result;
        });
    },
});

var newHost = new Vue({
    el: "#new_hot",
    data: {
        titleList: [

        ]
    },
    created() {
        axios({
            method: "get",
            url: "/queryHotBlog",
        }).then(function(resp) {
            var result = [];
            for(let i = 0; i < resp.data.data.length; i ++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid="+resp.data.data[i].id;
                result.push(temp)
            }
            newHost.titleList=result;
        });
    },
});

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: [
        ]
    },
    created() {
        axios({
            method: "get",
            url: "/queryNewComments",
        }).then(function(resp) {
            var result = [];
            console.log(resp.data.data[0].ctime)
            for(let i = 0; i < resp.data.data.length; i ++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = new Date(resp.data.data[i].ctime*1000).toLocaleDateString();
                temp.comment = resp.data.data[i].comments;
                result.push(temp)
            }
            newComments.commentList=result;
            console.log(result)
        });
    },

});
var search = new Vue({
    el: "#search",
    data: {
        search: "",
        active: ""
    },
    methods: {
        sendSearch: function () {
            axios({
                url: "/queryBlogBySearch?search=" + this.search
            }).then(function (resp) {
                articleList.count = resp.data.count;
                articleList.page = 1;
                articleList.generatePageTool;
                articleList.articleList = resp.data.list;
            });
        }
    },
    computed: {
        getActiveClass: function() {
            return function() {
                var param = location.pathname;
                if(param == "/index.html") {
                    this.active = 'index'
                }else if(param == "/about.html"){
                    this.active = 'about'
                }else if(param == "/guestbook.html") {
                    this.active = 'guestbook'
                }
            }
        }
    },
    created() {
        this.getActiveClass()
    }
});