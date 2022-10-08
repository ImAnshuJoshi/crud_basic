const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const quote = require("../model/quote.js");

module.exports = function (passport) {
  console.log("Yes its working");
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      function (jwt_payload, next) {
        console.log(jwt_payload);

        quote.findOne({ email: jwt_payload.email }, function (err, emp) {
          if (err) {
            return next(err, false);
          }
          if (emp) {
            next(null, emp);
          } else {
            next(null, false);
          }
        });
      }
    )
  );
};
