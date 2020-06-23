const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

// JSON WEB TOKEN STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: "authentication",
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exist, return 'error' or null
        if (!user) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// LOCAL STRATEGY (Store token in LocalStorage)
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Find the user given the email
      const user = await User.findOne({ email });

      // If not, handle it
      if (!user) {
        return done(null, false);
      }

      // Check if the password is correct

      // Otherwise return the user
    }
  )
);
