import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createNewUser, getUserByEmail } from '../../models/users.model.js';

export async function httpRegisterUser(req, res) {
    try {
        const user = req.body;
        
        const existingUser = await getUserByEmail(user.email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already taken!' });
        }
    
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        res.status(201).json(await createNewUser({ ...user, password: hashedPassword }));
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server error!' });
      }
}

export async function httpLoginUser(req, res) {
    try {
        const { email, password } = req.body;
    
        const user = await getUserByEmail(email);
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials!' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials!' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    
        res.json({ token });
      } catch (err) {
        console.error(err)
      }
}
