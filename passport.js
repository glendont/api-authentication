const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
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
      console.log("email");

      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        console.log(isMatch);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "595923078814-a7342ipt4287c0grf1rdefd7mqe59fud.apps.googleusercontent.com",
      clientSecret: "0l_5L3H8hOsk8EOqILued0Ik",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("AccessToken", accessToken);
        console.log("Refresh Token", refreshToken);
        console.log("Profile", profile);

        // Check whether this current user exists in our Database
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("User already exist in our DB");
          return done(null, existingUser);
        }
        console.log("User doesn't exist - We are creating a new one");
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
