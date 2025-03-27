import express from 'express'
import { updateContent, createContent, getContents, getContent } from "../controllers/contentController.js"

const router = express.Router();

router.post('/', createContent);
router.put('/', updateContent);
router.get('/', getContents);
router.get('/:id', getContent)



export default router;