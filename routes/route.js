import express from 'express';
import { fileUpload } from '../controller/image-controller.js';
import { authenticateTokon } from '../controller/jwt-controller.js';
import { readPosts, savePost, readPost, updatePost, deletePost } from '../controller/post-controller.js';
import { signup, login } from '../controller/user-controller.js';
import upload from '../utils/upload.js'
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/file/upload', upload.single('file'), fileUpload)
router.post('/create', authenticateTokon, savePost);
router.get('/posts', authenticateTokon, readPosts)
router.get('/post/:id', authenticateTokon, readPost)
router.put('/update/:id', authenticateTokon, updatePost)
router.delete('/delete/:id', authenticateTokon, deletePost)


export default router;