/*
 Navicat MySQL Data Transfer

 Source Server         : 本地mysql学习
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : my_blog

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 10/06/2020 16:45:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `views` int(0) NOT NULL,
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ctime` int(0) NULL DEFAULT NULL,
  `utime` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_ctime`(`ctime`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (18, 'webpack', '# css工程化概述 {ignore}\r\n\r\n## css的问题\r\n\r\n### 类名冲突的问题\r\n\r\n当你写一个css类的时候，你是写全局的类呢，还是写多个层级选择后的类呢？\r\n\r\n你会发现，怎么都不好\r\n\r\n- 过深的层级不利于编写、阅读、压缩、复用\r\n- 过浅的层级容易导致类名冲突\r\n\r\n一旦样式多起来，这个问题就会变得越发严重，其实归根结底，就是类名冲突不好解决的问题\r\n\r\n### 重复样式\r\n\r\n这种问题就更普遍了，一些重复的样式值总是不断的出现在css代码中，维护起来极其困难\r\n\r\n比如，一个网站的颜色一般就那么几种：\r\n\r\n- primary\r\n- info\r\n- warn\r\n- error\r\n- success\r\n\r\n如果有更多的颜色，都是从这些色调中自然变化得来，可以想象，这些颜色会到处充斥到诸如背景、文字、边框中，一旦要做颜色调整，是一个非常大的工程\r\n\r\n### css文件细分问题\r\n\r\n在大型项目中，css也需要更细的拆分，这样有利于css代码的维护。\r\n\r\n比如，有一个做轮播图的模块，它不仅需要依赖js功能，还需要依赖css样式，既然依赖的js功能仅关心轮播图，那css样式也应该仅关心轮播图，由此类推，不同的功能依赖不同的css样式、公共样式可以单独抽离，这样就形成了不同于过去的css文件结构：文件更多、拆分的更细\r\n\r\n而同时，在真实的运行环境下，我们却希望文件越少越好，这种情况和JS遇到的情况是一致的\r\n\r\n因此，对于css，也需要工程化管理\r\n\r\n从另一个角度来说，css的工程化会遇到更多的挑战，因为css不像JS，它的语法本身经过这么多年并没有发生多少的变化（css3也仅仅是多了一些属性而已），对于css语法本身的改变也是一个工程化的课题\r\n\r\n## 如何解决\r\n\r\n这么多年来，官方一直没有提出方案来解决上述问题\r\n\r\n一些第三方机构针对不同的问题，提出了自己的解决方案\r\n\r\n### 解决类名冲突\r\n\r\n一些第三方机构提出了一些方案来解决该问题，常见的解决方案如下：\r\n\r\n**命名约定**\r\n\r\n即提供一种命名的标准，来解决冲突，常见的标准有：\r\n\r\n- BEM\r\n- OOCSS\r\n- AMCSS\r\n- SMACSS\r\n- 其他\r\n\r\n**css in js**\r\n\r\n这种方案非常大胆，它觉得，css语言本身几乎无可救药了，干脆直接用js对象来表示样式，然后把样式直接应用到元素的style中\r\n\r\n这样一来，css变成了一个一个的对象，就可以完全利用到js语言的优势，你可以：\r\n\r\n- 通过一个函数返回一个样式对象\r\n- 把公共的样式提取到公共模块中返回\r\n- 应用js的各种特性操作对象，比如：混合、提取、拆分\r\n- 更多的花样\r\n\r\n> 这种方案在手机端的React Native中大行其道\r\n\r\n**css module**\r\n\r\n非常有趣和好用的css模块化方案，编写简单，绝对不重名\r\n\r\n具体的课程中详细介绍\r\n\r\n### 解决重复样式的问题\r\n\r\n**css in js**\r\n\r\n这种方案虽然可以利用js语言解决重复样式值的问题，但由于太过激进，很多习惯写css的开发者编写起来并不是很适应\r\n\r\n**预编译器**\r\n\r\n有些第三方搞出一套css语言的进化版来解决这个问题，它支持变量、函数等高级语法，然后经过编译器将其编译成为正常的css\r\n\r\n这种方案特别像构建工具，不过它仅针对css\r\n\r\n常见的预编译器支持的语言有：\r\n\r\n- less\r\n- sass\r\n\r\n### 解决css文件细分问题\r\n\r\n这一部分，就要依靠构建工具，例如webpack来解决了\r\n\r\n利用一些loader或plugin来打包、合并、压缩css文件', 9, 'webpack', NULL, NULL);
INSERT INTO `blog` VALUES (19, 'HTTPS 协议到底比 HTTP 协议多些什么', 'HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网\r\n（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。\r\nHTTP 是一个基于 TCP/IP 通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。\r\nHTTP 是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超\r\n媒体信息系统。它于 1990 年提出，经过几年的使用与发展，得到不断地完善和扩展。目\r\n前在 WWW 中使用的是 HTTP/1.0 的第六版，HTTP/1.1 的规范化工作正在进行之中，而且\r\nHTTP-NG(Next Generation of HTTP)的建议已经提出。\r\nHTTP 协议工作于客户端-服务端架构为上。浏览器作为 HTTP 客户端通过 URL 向 HTTP 服务\r\n端即 WEB 服务器发送所有请求。Web 服务器根据接收到的请求后，向客户端发送响应信\r\n息。\r\nHTTP 特点：\r\n1、简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有\r\nGET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于 HTTP 协议简单，\r\n使得 HTTP 服务器的程序规模小，因而通信速度很快。\r\n2、灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标\r\n记。\r\n3、无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，\r\n并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。\r\n4、无状态：HTTP 协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少\r\n状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的\r\n数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。\r\n5、支持 B/S 及 C/S 模式。\r\n以上简单回顾 HTTP 协议的相关内容。HTTP 协议有什么弊端么，还需要一个叫做 HTTPS 协\r\n议的安全协议。这里先说一下 HTTP 协议有什么样弊端？\r\nHTTP 弊端：当我们往服务器发送比较隐私的数据（比如说你的银行卡，身份证）时，如果使用 http\r\n进行通信。那么安全性将得不到保障。\r\n首先数据在传输的过程中，数据可能被中间人抓包拿到，那么数据就会被中间人窃取。\r\n其次数据被中间人拿到后，中间人可能对数据进行修改或者替换，然后发往服务器。\r\n最后服务器收到数据后，也无法确定数据有没有被修改或替换，当然，如果服务器也无法\r\n判断数据就真的是来源于客户端。\r\n总结下来，http 存在三个弊端： • 无法保证消息的保密性\r\n• 无法保证消息的完整性和准确性\r\n• 无法保证消息来源的可靠性', 4, 'HTTP ', NULL, NULL);
INSERT INTO `blog` VALUES (20, 'setTimeout 与 requestAnimationFrame 的区\r\n别', '提到 setTimeout 以及 requestAnimationFrame，大家的第一反应是动画相关的两个 API。\r\n我们来谈谈什么是动画。动画其实是一种假象，是一种不连续的运动以帧的形式呈现给我\r\n们的东西。在二十世纪，通常人们观看的电影其实就是通过胶片记录和投影的。它是以每\r\n秒至少 24 帧的速度形成的视觉上的运动起来的假象。NTSC 广播的标准的帧速率为\r\n23.975FPS，而 PAL 制式的为 25FPS。\r\nFPS 可以理解为我们常说的“刷新率（单位为 Hz）”，例如我们常在游戏里说的“FPS\r\n值”。我们在装机选购显卡和显示器的时候，都会注意到“刷新率”。一般我们设置缺省\r\n刷新率都在 75Hz（即 75 帧/秒）以上。例如：75Hz 的刷新率刷也就是指屏幕一秒内只扫\r\n描 75 次，即 75 帧/秒。而当刷新率太低时我们肉眼都能感觉到屏幕的闪烁，不连贯，对\r\n图像显示效果和视觉感观产生不好的影响。\r\n因此，至少要以 24FPS 的速率才能形成动画，但这样的动画并不是平滑的，流畅的。平滑\r\n的动画要以无线帧速率才能实现，但是对于人类大脑而言是侦测不到那种情况下的帧速\r\n率，可以说 60FPS 就已经很不错了。常见的电脑、智能手机等大部分现代化设备通常是以\r\n60FPS 的速率刷新屏幕的，少部分游戏系统则支持 120FPS。\r\n那么，什么又是帧呢？这个没有绝对的定义，它主要是依赖于使用的具体环境。例如，电\r\n影胶片的每一帧都是由所记录的 FPS 决定的。在录制视频时，把摄像机的帧率调为\r\n30FPS，那么就必须以 30FPS 的速率在 1s 内播放生成的 30 个单独图像。然而，在讨论\r\nweb 时，帧的定义又发生了变化。\r\n对于 web 动画，我们可以在设备屏幕中移动 1px 或者更多。移动一个元素（DOM 元素）的\r\n像素越少，那么动画就越流畅，越平滑。帧其实就是 DOM 元素在屏幕上的实时位置的一\r\n个快照。在 1s 内，如果一个元素以 1px/次 的速度移动 60px，那么 FPS 值就是 60。也\r\n就是说，上面等价于以 2px/次 的速度移动 120px。虽然移动速度变大了，但是动画并不\r\n会更加流畅平滑，因为相应的元素的移动距离也变大了。\r\n那么，如何使用 JavaScript 让 DOM 元素产生动画效果呢？\r\n可以使用 JavaScript 中的 setTimeout 或者 setInterval 函数。\r\nsetTimeout 是以 n 毫秒后执行回调函数，回调函数中可以递归\r\n调用 setTimeout 来实现动画。\r\nsetInterval 以 n 毫秒的间隔时间调用回调函数', 11, 'setTimeout 与 requestAnimationFrame 的区\r\n别', NULL, NULL);
INSERT INTO `blog` VALUES (21, '你了解 Ajax 么？常用的 ajax 优化有哪些？', 'AJAX 全称 Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。将 A JAX\r\n中处理的一些异步信息或叫“即时”信息，保存在缓存中，不要每次去异步处理时，都去\r\n调用 DHMTL 的元素信息。\r\n正常情况下填好表单信息并提交后，整个表单信息会发送到服务器，服务器会将它转发给\r\n处理表单的脚本，通常是后台的 PHP 或 JAVA，后台脚本执行完成后服务器会发送回全新\r\n的页面信息。AJAX 正常会把 JavaScript 技术和 XMLHttpRequest 对象放在 Web 表单和服\r\n务器之间，当填好表单信息并提交后，会先使用 JavaScript 代码执行而不是直接发送给\r\n服务器，也就是说 JavaScript 代码会在后台发送请求到服务器，并且可以异步处理，即\r\nJavaScript 代码在发送信息时，不用等待服务器的响应，可以继续发送其它的信息DHTML 是一种使 HTML 页面具有动态特性的艺术，DHTML 是一种创建动态和交互 WEB 站点的\r\n技术集。对大多数人来说，DHTML 意味着 HTML、样式表和 JavaScript 的组合。当发起主动 AJAX 请求时，用户可能仍须等待，所以必须优化请求，优化请求最主要的方\r\n式就是使响应可以缓存。\r\n即当 AJAX 发送数据成功后，会把请求的 URL 和返回的响应结果信息保存在缓存中，这样\r\n下次调用 AJAX 发送相同请求时，会直接从缓存中把数据取出来，这样可以提高请求的响\r\n应速度。\r\n通过 Ajax 缓存来提升页面性能 \r\nAJAX 缓存可以让请求对一些静态页面内容的信息处理的更迅速，比如图片、CSS 文件、JS\r\n脚本等。可以让 AJAX 可缓存的响应头包括：Expires、Last-Modified 和 CacheControl。\r\n1) Expires\r\nExpires 是通过判断内容是否被修改来确定是否使用浏览器缓存中的内容，如果我们知道\r\n内容何时修改，那么可以使用 Expires 响应头来处理。\r\nhttp/1.0 中定义的 header，是最基础的浏览器缓存处理，表示资源在一定时间内从浏览\r\n器的缓存中获取资源，不需要请求服务器获取资源，从而达到快速获取资源，缓解服务器\r\n压力的目的。\r\n在 response 的 header 中的格式为：Expires: Thu, 01 Dec 1994 16:00:00 GMT （必须\r\n是 GMT 格式）', 4, '你了解 Ajax 么？常用的 ajax 优化有哪些？', NULL, NULL);
INSERT INTO `blog` VALUES (22, 'CDN 的基本原理和基础架构', 'CDN 是将源站内容分发至最接近用户的节点，使用户可就近取得所需内容，提高用户访问\r\n的响应速度和成功率。解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点\r\n加速、点播、直播等场景。\r\n最简单的 CDN 网络由一个 DNS 服务器和几台缓存服务器组成：\r\n1. 当用户点击网站页面上的内容 URL，经过本地 DNS 系统解析，DNS 系统会最终将域\r\n名的解析权交给 CNAME 指向的 CDN 专用 DNS 服务器。\r\n2. CDN 的 DNS 服务器将 CDN 的全局负载均衡设备 IP 地址返回用户。\r\n3. 用户向 CDN 的全局负载均衡设备发起内容 URL 访问请求。\r\n4. CDN 全局负载均衡设备根据用户 IP 地址，以及用户请求的内容 URL，选择一台用户\r\n所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。\r\n5. 区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包\r\n括：根据用户 IP 地址，判断哪一台服务器距用户最近；根据用户所请求的 URL 中\r\n携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负\r\n载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区\r\n域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的 IP 地址。\r\n6. 全局负载均衡设备把服务器的 IP 地址返回给用户。\r\n7. 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用\r\n户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它\r\n分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯\r\n到网站的源服务器将内容拉到本地。', 3, 'CDN 的基本原理和基础架构', NULL, NULL);
INSERT INTO `blog` VALUES (23, 'CSRF 攻击', '网络千万条，安全第一条。网安不规范，网站都完蛋！\r\n对于前端工程师来说，遇到最多的网络安全是 XSS 攻击，上一篇文章已经给大家说过了。\r\n今天我们来看看前端工程师遇到第二多的网络安全问题 CSRF 攻击。\r\n什么是 CSRF 攻击？ \r\nCSRF 概念：CSRF（Cross-site request forgery）跨站请求伪造，也被称为“One Click \r\nAttack”或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利\r\n用。\r\n尽管听起来像跨站脚本（XSS），但它与 XSS 非常不同，XSS 利用站点内的信任用户，而\r\nCSRF 则通过伪装成受信任用户的请求来利用受信任的网站。\r\n与 XSS 攻击相比，CSRF 攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难\r\n以防范，所以被认为比 XSS 更具危险性。\r\n造成 CSRF 攻击原理\r\n发送请求自动带上 cookie：浏览器中 HTTP(s) 请求是会自动帮我们把\r\ncookie 带上传给服务端的。这样在每次请求的时候通过 cookie 获取 session id，然后\r\n通过它在服务端获取登录信息即可完成用户权限的校验。\r\n本来这也是个不错的功能。但是由于 cookie 实在是太开放了，如果一个用户在 A 网站\r\n登录了，并且在没有登出的情况下（没有清除本地信息，包括 cookie），用户在 B 网站\r\n访问的时候发送了一个 A 网站的请求，那么这个请求其实是带有这个用户在 A 网站的登\r\n录信息的。如果这时候 B 站发送的 A 网站请求是用户不知道的，并且可以进行用户非本\r\n意操作（获取信息，修改内容，转账等等）。那就是非常严重的危害了。以上的过程就是\r\n跨站请求攻击，即 Cross-Site Request Forgery，即 CSRF。', 1, 'CSRF 攻击', NULL, NULL);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `blog_id` int(0) NULL DEFAULT NULL,
  `parent` int(0) NULL DEFAULT NULL,
  `parent_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `comments` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ctime` int(0) NULL DEFAULT NULL,
  `utime` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx`(`blog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (20, -2, -1, '0', 'qingyou', '54669544@qq.con', 'good website 很不错的博客', 1591759697, 1591759697);
INSERT INTO `comments` VALUES (21, -2, -1, '0', 'longlong', '83256@163.com', '一起交流前端领域知识啊 可以吗', 1591759786, 1591759786);
INSERT INTO `comments` VALUES (22, -1, -1, NULL, 'qinfyou', '123456@163.com', '', 1591760259, 1591760259);

-- ----------------------------
-- Table structure for every_day
-- ----------------------------
DROP TABLE IF EXISTS `every_day`;
CREATE TABLE `every_day`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ctime` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_ctime`(`ctime`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of every_day
-- ----------------------------
INSERT INTO `every_day` VALUES (11, '欢迎来到丁玉东的博客', NULL);

-- ----------------------------
-- Table structure for tag_blog_mapping
-- ----------------------------
DROP TABLE IF EXISTS `tag_blog_mapping`;
CREATE TABLE `tag_blog_mapping`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `tag_id` int(0) NOT NULL,
  `blog_id` int(0) NOT NULL,
  `ctime` int(0) NULL DEFAULT NULL,
  `utime` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_tag_id`(`tag_id`) USING BTREE,
  UNIQUE INDEX `idx_blog_id`(`blog_id`) USING BTREE,
  UNIQUE INDEX `uq_tag_id_blog_id`(`tag_id`, `blog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag_blog_mapping
-- ----------------------------
INSERT INTO `tag_blog_mapping` VALUES (5, 6, 18, NULL, NULL);
INSERT INTO `tag_blog_mapping` VALUES (6, 7, 19, NULL, NULL);
INSERT INTO `tag_blog_mapping` VALUES (7, 9, 22, NULL, NULL);
INSERT INTO `tag_blog_mapping` VALUES (8, 8, 21, NULL, NULL);

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ctime` int(0) NULL DEFAULT NULL,
  `utime` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tag_nq`(`tag`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (6, 'webpack', NULL, NULL);
INSERT INTO `tags` VALUES (7, 'HTTP ', NULL, NULL);
INSERT INTO `tags` VALUES (8, 'Ajax', NULL, NULL);
INSERT INTO `tags` VALUES (9, 'CDN ', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
