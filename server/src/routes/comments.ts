import express, { Request, Response } from "express";
import { Comment } from "../models/comment";
import Comments from "../services/comment-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Comments.index()
    .then((list: Comment[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Comments.get(id)
    .then((comment: Comment) => res.json(comment))
    .catch((err) => res.status(404).send(err));
});

router.get("/book/:bookId", (req: Request, res: Response) => {
  const { bookId } = req.params;

  Comments.getByBook(bookId)
    .then((comments: Comment[]) => res.json(comments))
    .catch((err) => res.status(500).send(err));
});

router.get("/user/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  Comments.getByUser(userId)
    .then((comments: Comment[]) => res.json(comments))
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newComment = req.body;

  Comments.create(newComment)
    .then((comment: Comment) => res.status(201).json(comment))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newComment = req.body;

  Comments.update(id, newComment)
    .then((comment: Comment) => res.json(comment))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Comments.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;