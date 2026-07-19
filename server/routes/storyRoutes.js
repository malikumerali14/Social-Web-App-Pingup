import express from 'express'
import { addStory, getStories } from '../controllers/storyController';
import { protect } from '../middlewares/auth';

const storyRouter = express.Router();

storyRouter.post('/create', upload.single('media'), protect, addStory);
storyRouter.get('/get', upload.single('media'), protect, getStories);

export default storyRouter;