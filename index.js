var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var bodyParser = require('body-parser');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//静态文件
app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave:true,
  saveUninitialized:true,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}));

app.use(flash());

//app.use(require('express-formidable')({
    // uploadDir : path.join(__dirname ,'public/img'),
    // keepExtensions : true
//}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.locals.blog = {
    title : pkg.name,
    description : pkg.description
};

app.use(function(req,res,next){
    res.locals.user = req.session.user;
    res.locals.success  =req.flash('success').toString();
    res.locals.error  = req.flash('error').toString();
    res.locals.info = req.flash("info").toString();
    next();
});

routes(app);

app.listen(config.port,function(){
    console.log(`${pkg.name} listening on port ${config.port}`);
});

