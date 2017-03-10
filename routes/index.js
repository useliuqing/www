module.exports = function(app){
    app.use('/signin',require('./signin'));
    app.use('/signup',require('./signup'));
    app.use('/posts',require('./posts'));
    app.use('/stock',require('./stock'));
    app.use('/setViewableInfo',require('./setViewableInfo'));
    app.use('/item',require('./item'));
    app.use('/kind',require('./kind'));
    app.use('/supplier',require('./supplier'));
    app.use('/purchase',require('./purchase'));
}