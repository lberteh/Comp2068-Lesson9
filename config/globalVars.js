// global variables for the application
module.exports = {
    // db: 'mongodb://localhost/comp2068'
    db: 'mongodb://lberteh:lb885642lb@ds015194.mlab.com:15194/comp2068',
    secret: 'dbkjd  s7d8 89 (*G(U  09n ds09()))' // used to create salt
    ids: {
      facebook: {
        clientID: '1664496710506989',
        clientSecret: 'b30f78b992cf32b76db3a4f7f76e7b03',
        callbackURL: 'http://localhost:3000/facebook/callback' 
      }
    }
};
