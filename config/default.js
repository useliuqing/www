module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 5*60*1000
  },
  mongodb: 'mongodb://127.0.0.1:27017/myblog',
  logFile : './log/serverlog.log'
};
