
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');//引入用户模块
var weibo = require('./routes/weibo');//引入weibo模块
var http = require('http');
var path = require('path');
var mongoStore = require('connect-mongo')(express);//会话模块
var settings = require('./dao/settings');//DB连接模块

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname,'public/images/logo.jpg')));//网站图标
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.cookieParser);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));//静态资源目录
app.use(express.session({//会话控制
	secret:new mongoStore({
		db: settings.db
	})
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);//首页
app.get('/u/:user', user.user);//个人主页
app.get('/post', weibo.post);//发表信息
app.get('/reg', user.reg);//注册
app.get('/reg', user.doReg);//注册处理
app.get('/login', user.login);//登录
app.get('/login', user.doLogin);//登录处理
app.get('/logout', user.logout);//退出

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
