import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Books from "./services/book-svc";
import Authors from "./services/author-svc";
import Categories from "./services/category-svc";
import Statuses from "./services/status-svc";
import Comments from "./services/comment-svc";
import Users from "./services/user-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("book_collection");

app.use(express.json());
app.use(express.static(staticDir));

app.get("/api/books", (req: Request, res: Response) => {
  Books.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.get("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Books.get(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.post("/api/books", (req: Request, res: Response) => {
  const book = req.body;
  Books.create(book).then((data) => {
    res.status(201).set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.put("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = req.body;
  Books.update(id, book).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.delete("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Books.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/authors", (req: Request, res: Response) => {
  Authors.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.get("/api/authors/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Authors.get(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/authors/:id/books", (req: Request, res: Response) => {
  const { id } = req.params;
  Books.getByAuthor(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.post("/api/authors", (req: Request, res: Response) => {
  const author = req.body;
  Authors.create(author).then((data) => {
    res.status(201).set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.put("/api/authors/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const author = req.body;
  Authors.update(id, author).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.delete("/api/authors/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Authors.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/categories", (req: Request, res: Response) => {
  Categories.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.get("/api/categories/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Categories.get(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/categories/:id/books", (req: Request, res: Response) => {
  const { id } = req.params;
  Books.getByCategory(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.post("/api/categories", (req: Request, res: Response) => {
  const category = req.body;
  Categories.create(category).then((data) => {
    res.status(201).set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.put("/api/categories/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const category = req.body;
  Categories.update(id, category).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.delete("/api/categories/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Categories.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/statuses", (req: Request, res: Response) => {
  Statuses.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.get("/api/statuses/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Statuses.get(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/statuses/:id/books", (req: Request, res: Response) => {
  const { id } = req.params;
  Books.getByStatus(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.post("/api/statuses", (req: Request, res: Response) => {
  const status = req.body;
  Statuses.create(status).then((data) => {
    res.status(201).set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.put("/api/statuses/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const status = req.body;
  Statuses.update(id, status).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.delete("/api/statuses/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Statuses.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/users", (req: Request, res: Response) => {
  Users.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.get("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Users.get(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/users/:id/comments", (req: Request, res: Response) => {
  const { id } = req.params;
  Comments.getByUser(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.post("/api/users", (req: Request, res: Response) => {
  const user = req.body;
  Users.create(user).then((data) => {
    res.status(201).set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.put("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body;
  Users.update(id, user).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.delete("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Users.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/api/books/:bookId/comments", (req: Request, res: Response) => {
  const { bookId } = req.params;
  Comments.getByBook(bookId).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(500).send(err.toString());
  });
});

app.post("/api/comments", (req: Request, res: Response) => {
  const comment = req.body;
  Comments.create(comment).then((data) => {
    res.status(201).set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.put("/api/comments/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = req.body;
  Comments.update(id, comment).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch(err => {
    res.status(400).send(err.toString());
  });
});

app.delete("/api/comments/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Comments.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(404).send(err.toString());
  });
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});