const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },

        // VERIFY CALLBACK
        async (accessToken, refreshToken, profile, done) => {
            try {
                // "PROFILE" OBJECT CONTAINS THE USER'S GITHUB INFO
                const user = await User.findOne({ githubId: profile.id });

                // CHECK IF USER EXISTS ALREADY
                if (user) {
                    return done(null, user);
                }

                // CREATE A NEW USER IN DATABASE
                const newUser = new User({
                    email: profile.emails[0].value,
                    githubId: profile.id,
                });

                await newUser.save();
                done(null, newUser);

            } catch (error) {
                done(error)
            }
        }
    )
);