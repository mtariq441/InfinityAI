import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Express } from "express";
import { storage } from "./storage";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable must be set in production");
  }
  return "dev-secret-key-not-for-production";
})();

export function setupGoogleAuth(app: Express) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("Google OAuth not configured. GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required.");
    return;
  }

  const callbackURL = process.env.NODE_ENV === "production" 
    ? `https://${process.env.REPLIT_DEV_DOMAIN}/api/auth/google/callback`
    : "http://localhost:5000/api/auth/google/callback";

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const googleId = profile.id;
          const name = profile.displayName;
          const profileImage = profile.photos?.[0]?.value;

          let user = await storage.getUserByProviderId("google", googleId);

          if (!user && email) {
            user = await storage.getUserByEmail(email);
            
            if (user && user.provider === "local") {
              return done(null, false, { message: "Email already registered with password. Please use email/password login." });
            }
          }

          if (!user) {
            user = await storage.createUser({
              email: email || null,
              name: name || null,
              provider: "google",
              providerId: googleId,
              profileImage: profileImage || null,
              password: null,
            });

            await storage.createUserSettings({ userId: user.id });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.use(passport.initialize());

  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login?error=auth_failed" }),
    (req, res) => {
      const user = req.user as any;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      res.redirect(`/login?token=${token}&name=${encodeURIComponent(user.name || '')}&email=${encodeURIComponent(user.email || '')}`);
    }
  );
}
