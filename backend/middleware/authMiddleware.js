//Validate the token

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("not authorize token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

export { protect };
