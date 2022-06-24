import express from 'express';
import { CreateNote, DeleteNote, getNoteById, getNotes, UpdateNote } from '../controller/notesController.js'
import Protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(Protect, getNotes);
router.route("/create").post(Protect, CreateNote);
router
  .route("/:id")
  .get(getNoteById)
  .put( UpdateNote)
  .delete(Protect, DeleteNote);

  export default router;