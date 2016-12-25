var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkd = require('./package');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//?íuê√??åπ
app.use(express.static(path.join(__dirname,'public')));

app.use(flash());

app.use(require('express-formidable')({
    uploadDir : path.joid(__dirname ,'public/img'),
    keepExtensions : true
}));

routes(app);

app.listen(config.port,function(){
    console.log(`${pkg.name} listening on port ${config.port}`);
});

