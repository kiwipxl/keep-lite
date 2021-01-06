const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const credentials = require("./google-credentials.json");
const { createUser, getUser } = require("./user");

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.clientID,
      clientSecret: credentials.clientSecret,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await getUser(profile.id);

      if (!user) {
        user = await createUser(profile.id, "google", "", profile.displayName);
      }

      done(null, user);
    }
  )
);

// Passport stores user data in the browser's session so it can be retrieved
// without re-authenticating.
// We store the id for simplicity sake.
// NOTE: These functions are required.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await getUser(userId);
  done(user ? null : `No user could be found with id ${userId}`, user);
});

module.exports.use = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/error",
    }),
    (req, res) => {
      // res.redirect("/");
      res.send(req.user);
    }
  );

  app.get("/", (req, res, next) => {
    res.send("hello world!");
  });
};
