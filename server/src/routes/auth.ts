import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// Hardcoded admin for portfolio simplicity or you can use DB
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  console.log(`Login attempt for: ${email}`);
  
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d'
    });
    return res.json({ token });
  } else {
    console.log('Invalid credentials');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
