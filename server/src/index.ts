import express from "express";
import { connect } from "./services/mongo";
import cors from 'cors';

import authors from "./routes/authors";
import books from "./routes/books";
import categories from "./routes/categories";
import comments from "./routes/comments";
import statuses from "./routes/statuses";
import users from "./routes/users";
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";


connect("book_collection");

app.use(express.json());
app.use(express.static(staticDir));
app.use("/auth", auth);
app.use("/api/authors", authors);
app.use("/api/books", books);
app.use("/api/categories", categories);
app.use("/api/comments", comments);
app.use("/api/statuses", statuses);
app.use("/api/users", users);
app.use(cors());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});