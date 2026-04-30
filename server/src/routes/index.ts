import { Router, Request, Response } from 'express';
import User from '../models/User';
import Education from '../models/Education';
import Experience from '../models/Experience';
import Project from '../models/Project';
import Skill from '../models/Skill';
import { protect } from '../middleware/auth';

const router = Router();

// Generic CRUD factory
const createCrudRoutes = (model: any, path: string) => {
  // Get all
  router.get(`/${path}`, async (req: Request, res: Response) => {
    try {
      const items = await model.find();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // Get one
  router.get(`/${path}/:id`, async (req: Request, res: Response) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // Create
  router.post(`/${path}`, protect, async (req: Request, res: Response) => {
    try {
      const newItem = new model(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  // Update
  router.put(`/${path}/:id`, protect, async (req: Request, res: Response) => {
    try {
      const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ message: 'Not found' });
      res.json(updatedItem);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete
  router.delete(`/${path}/:id`, protect, async (req: Request, res: Response) => {
    try {
      const deletedItem = await model.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });
};

// Special route for the single user profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/profile', protect, async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

createCrudRoutes(User, 'users');
createCrudRoutes(Education, 'education');
createCrudRoutes(Experience, 'experience');
createCrudRoutes(Project, 'projects');
createCrudRoutes(Skill, 'skills');

export default router;
