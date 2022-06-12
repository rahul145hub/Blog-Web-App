import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();

export const authenticateTokon = async (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1];
   if (!token) {
      res.status(400).json({ success: false, error: ["not valid token"] })
   }

   jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) {
         res.status(400).json({ success: false, error: ["not valid token"] })
      }
      req.user = user
      next()
   })
}