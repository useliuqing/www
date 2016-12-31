module.exports = function(app){
    app.use('/signin',require('./signin'));
    app.use('/signup',require('./signup'));
    app.use('/posts',require('./posts'));
    app.use('/stock',require('./stock'));
}