import User from "../models/user.js";
import bcrypt from 'bcrypt'
import Token from '../models/token.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
   try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = { ...req.body, "password": hashedPassword };
      const newUser = new User(user);
      await newUser.save()

      res.status(200).json({ success: true })
   } catch (error) {
      res.status(400).json({ success: false, error: ['All fields are mandatory', 'Email should be unique'] })
   }
}

export const login = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email })
      if (!user) {
         res.status(400).json({ success: false, error: ["Wrong email/password"] })
      }
      let match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
         res.status(400).json({ success: false, error: ["Wrong email/password"] })
      }

      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET, { expiresIn: '1hr' });
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET);

      const newToken = await new Token({ token: refreshToken })
      await newToken.save()
      res.status(200).json({ success: true, accessToken, refreshToken, name: user.name, email: user.email })
   } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, error: ["Error while login"] })
   }
}