var graph                 = require('fbgraph');
var passport              = require('passport');
var BearerStrategy        = require('passport-http-bearer').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token').Strategy;
var User                  = require('./models/user');

var FACEBOOK_APP_ID     = process.env.FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(new BearerStrategy(function(token, done) {
  User.findOne({token: token}, function(err, user) {
    done(err ? new Error('Invalid token') : null, user);
  });
}));

passport.use(new FacebookTokenStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    enableProof: true
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAndUpdate({ facebookId: profile.id }, {}, { upsert: true }, function (err, user) {
      if (err) return done(err);

      graph.extendAccessToken({
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        access_token: accessToken
      }, function(err, res) {
        if (err) return done(err);

        user.set({ fbToken: res.access_token });
        user.save(function(err) {
          return done(err, user);
        });
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  try {
    User.findById(new ObjectId(id), function(err, user) {
      if (err) return done(err);
      done(null, user || null);
    });
  } catch (e) {
    done(null, null);
  }
});

var auth = {
  facebook: passport.authenticate('facebook-token'),
  required: passport.authenticate('bearer', {
    session: false
  })
};

module.exports = auth;
