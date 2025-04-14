import express from "express";
import passport from "passport";
import dotenv from "dotenv"

import { generateToken } from "../utils/token.js";
import '../auth/google.js'

const googleRoute = express.Router();

googleRoute.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));
  googleRoute.get("/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
      await generateToken(req.user._id, res); // ✅ Sets the cookie
      res.redirect("http://localhost:5173/"); // ✅ No token in URL needed
    }
  );

export default googleRoute;