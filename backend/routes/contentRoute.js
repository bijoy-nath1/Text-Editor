import express from 'express'
import { updateDraft, createUser, getDrafts, getDraft } from "../controllers/contentController.js"

const router = express.Router();

router.post('/', createUser);
router.put('/', updateDraft);
router.get('/:userGoogleId', getDrafts);
router.get('/:id', getDraft)



export default router;