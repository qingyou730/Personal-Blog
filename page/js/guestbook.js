let blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: [
        ]
    },
    method: {},
    computed: {
        reply: function() {
            return function(commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href="#send_comment";
            }
        }
    },
    created: function() {
        var bid = -2;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid="+bid
        }).then(function(resp) {
            blogComments.comments = resp.data.data;
            for(let i = 0; i < blogComments.comments.length; i ++) {
                if(blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复"+blogComments.comments[i].parent_name
                }
            }
        });
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid="+bid
        }).then(function(resp) {
            blogComments.total = resp.data.data[0].count;
        });
    }
})
let sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: '',
        rigthCode: ""
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rigthCode = resp.data.data.text;
                });
            }
        },
        sendComment: function () {
            return function () {
                let code = document.getElementById("comment_code").value;
                if(sendComment.rigthCode != code) {
                    alert("验证码有误");
                    return;
                }
                var bid = -2;

                let reply = document.getElementById("comment_reply").value;
                let replyName = document.getElementById("comment_reply_name").value;
                let name = document.getElementById("comment_name").value;
                let email = document.getElementById("comment_email").value;
                let content = document.getElementById("comment_content").value;
                // let content = document.getElementById("comment_code").value;
                axios({
                    method: 'get',
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content +"&parentName="+replyName
                }).then(function (resp) {
                    alert("评论成功");
                });
            }
        },
    },
    created() {
        this.changeCode();
    }
});